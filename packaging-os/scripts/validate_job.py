#!/usr/bin/env python3
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print('ERROR: PyYAML is required: pip install pyyaml')
    sys.exit(2)


def fail(msg):
    print(f'FAIL: {msg}')
    return 1


def main(path):
    data = yaml.safe_load(Path(path).read_text(encoding='utf-8'))
    errors = 0
    for key in ('job_id', 'sku', 'product', 'package', 'evidence'):
        if key not in data:
            errors += fail(f'missing required field: {key}')
    if errors:
        return 1
    if not data['product'].get('name'):
        errors += fail('product.name is required')
    package = data['package']
    if package.get('unit') not in {'mm', 'cm', 'in'}:
        errors += fail('package.unit must be mm, cm, or in')
    for key in ('width', 'height'):
        value = package.get(key)
        if value is not None and (not isinstance(value, (int, float)) or value <= 0):
            errors += fail(f'package.{key} must be a positive number or null')
    if not data.get('evidence'):
        errors += fail('at least one evidence record is required')
    for claim in data['product'].get('claims', []):
        if claim.get('status') == 'approved' and not claim.get('evidence_id'):
            errors += fail(f"approved claim lacks evidence_id: {claim.get('text', '<unnamed>')}")
    if errors:
        return 1
    print('PASS: job contract basic validation')
    return 0


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('usage: validate_job.py job.yaml')
        sys.exit(2)
    sys.exit(main(sys.argv[1]))

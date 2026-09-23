#!/usr/bin/env python3
import sys
from pathlib import Path
import yaml

BLOCKING_TOKENS = {'unknown', 'needs_evidence', 'verification_required'}


def scan(value, path='root'):
    issues = []
    if isinstance(value, dict):
        for key, child in value.items():
            issues.extend(scan(child, f'{path}.{key}'))
    elif isinstance(value, list):
        for i, child in enumerate(value):
            issues.extend(scan(child, f'{path}[{i}]'))
    elif isinstance(value, str) and value.strip().lower() in BLOCKING_TOKENS:
        issues.append((path, value))
    return issues


def main(job_path, vendor_path=None):
    job = yaml.safe_load(Path(job_path).read_text(encoding='utf-8'))
    blockers = []

    blockers.extend(scan(job))

    if job.get('assumptions'):
        blockers.append(('root.assumptions', 'unresolved production assumptions exist'))

    for claim in job.get('product', {}).get('claims', []):
        if claim.get('status') != 'approved':
            blockers.append((f"claim:{claim.get('text', '<unnamed>')}", claim.get('status', 'unknown')))

    if vendor_path:
        vendor = yaml.safe_load(Path(vendor_path).read_text(encoding='utf-8'))
        blockers.extend(scan(vendor, 'vendor'))
    else:
        blockers.append(('vendor', 'missing vendor profile'))

    if blockers:
        print('BLOCKED: production release gate')
        for path, reason in blockers:
            print(f'- {path}: {reason}')
        return 1

    print('PASS: deterministic release gate. Human approval is still required.')
    return 0


if __name__ == '__main__':
    if len(sys.argv) not in (2, 3):
        print('usage: release_gate.py job.yaml [vendor-profile.yaml]')
        sys.exit(2)
    sys.exit(main(*sys.argv[1:]))

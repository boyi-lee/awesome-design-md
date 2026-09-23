#!/usr/bin/env python3
import sys
from pathlib import Path
import yaml


def to_mm(value, unit):
    if unit == 'mm':
        return value
    if unit == 'cm':
        return value * 10
    if unit == 'in':
        return value * 25.4
    raise ValueError(f'unsupported unit: {unit}')


def svg(job):
    p = job['package']
    if p.get('structure') != 'header-card':
        raise ValueError('this generator only supports package.structure=header-card')
    if p.get('width') is None or p.get('height') is None:
        raise ValueError('header-card requires package.width and package.height')
    unit = p['unit']
    w = to_mm(float(p['width']), unit)
    h = to_mm(float(p['height']), unit)
    bleed = to_mm(float(p.get('bleed') or 0), unit)
    safe = to_mm(float(p.get('safe_margin') or 0), unit)
    canvas_w, canvas_h = w + 2*bleed, h + 2*bleed
    cut_x = cut_y = bleed
    safe_x, safe_y = bleed + safe, bleed + safe
    safe_w, safe_h = max(0, w-2*safe), max(0, h-2*safe)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{canvas_w}mm" height="{canvas_h}mm" viewBox="0 0 {canvas_w} {canvas_h}">
  <g id="BLEED" fill="none" stroke="#00AEEF" stroke-width="0.2">
    <rect x="0.1" y="0.1" width="{canvas_w-0.2}" height="{canvas_h-0.2}"/>
  </g>
  <g id="CUT" fill="none" stroke="#FF00FF" stroke-width="0.25">
    <rect x="{cut_x}" y="{cut_y}" width="{w}" height="{h}"/>
  </g>
  <g id="SAFE" fill="none" stroke="#00A651" stroke-dasharray="2 1" stroke-width="0.2">
    <rect x="{safe_x}" y="{safe_y}" width="{safe_w}" height="{safe_h}"/>
  </g>
</svg>'''


def main(inp, out):
    job = yaml.safe_load(Path(inp).read_text(encoding='utf-8'))
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    Path(out).write_text(svg(job), encoding='utf-8')
    print(f'WROTE: {out}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('usage: generate_header_card.py job.yaml output.svg')
        sys.exit(2)
    main(sys.argv[1], sys.argv[2])

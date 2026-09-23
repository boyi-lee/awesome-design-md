import unittest
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from generate_header_card import to_mm, svg


class HeaderCardTests(unittest.TestCase):
    def test_unit_conversion(self):
        self.assertEqual(to_mm(1, 'cm'), 10)
        self.assertAlmostEqual(to_mm(1, 'in'), 25.4)

    def test_svg_layers(self):
        job = {'package': {'structure':'header-card','unit':'mm','width':100,'height':60,'bleed':3,'safe_margin':4}}
        out = svg(job)
        self.assertIn('id="BLEED"', out)
        self.assertIn('id="CUT"', out)
        self.assertIn('id="SAFE"', out)
        self.assertIn('106.0mm', out)


if __name__ == '__main__':
    unittest.main()

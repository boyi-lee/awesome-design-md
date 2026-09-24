import tempfile
import unittest
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import release_gate


class ReleaseGateTests(unittest.TestCase):
    def write_yaml(self, text):
        f = tempfile.NamedTemporaryFile('w', suffix='.yaml', delete=False, encoding='utf-8')
        f.write(text)
        f.close()
        return f.name

    def test_blocks_unapproved_claim_and_assumptions(self):
        job = self.write_yaml('''
product:
  claims:
    - text: test claim
      status: needs_evidence
assumptions:
  - demo geometry
''')
        vendor = self.write_yaml('''
status: approved
production:
  bleed_mm: 3
''')
        self.assertEqual(release_gate.main(job, vendor), 1)

    def test_passes_clean_machine_gate(self):
        job = self.write_yaml('''
product:
  claims:
    - text: verified claim
      status: approved
assumptions: []
''')
        vendor = self.write_yaml('''
status: approved
production:
  bleed_mm: 3
  safe_margin_mm: 4
''')
        self.assertEqual(release_gate.main(job, vendor), 0)


if __name__ == '__main__':
    unittest.main()

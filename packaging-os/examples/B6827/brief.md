# B6827 Packaging Test Brief

## Facts from source
- SKU: B6827
- Product: UD便捷無塑化劑透明雨衣/1入
- Product size: approx. width 54 × length 115 cm ±3%
- Raincoat material: PEVA 聚乙烯-醋酸乙烯酯
- Button material: PP 聚丙烯
- Use: personal
- Quantity: 1 piece
- Cleaning: wipe stains with a damp cloth, then rinse with clean water
- Storage: store in a cool, ventilated place
- Shelf-life statement: unopened, normal-temperature storage for 10 years
- Country of origin: MADE IN CHINA
- Package material: OPP composite bag

## Verified feature statements from source
1. PEVA材質｜可重複使用
2. 透明防雨｜PEVA材質，阻隔雨水，透明外觀
3. 加長遮護｜約115cm長版設計，加強身體與腿部遮護
4. 連帽調節｜帽繩可依需求調整，減少雨水進入
5. 按扣穿脫｜前開式按扣設計，穿脫快速便利
6. 輕巧便攜｜可摺疊收納、重複使用，適合通勤、旅遊備用

## Package structure routing
Source identifies an OPP composite bag, so this test routes to `pouch` rather than inventing a header card or carton.

The current structure registry marks `pouch` as planned and requires:
- finished width
- finished height
- seal allowance
- material structure

Only material structure is currently known. Production geometry is therefore blocked.

## Unknown / blocked inputs
- Finished pouch width
- Finished pouch height
- Seal allowance
- Bag thickness / laminate construction details beyond the generic source wording
- Seal locations
- Tear notch / zipper / hang-hole requirements
- Printer bleed and safe area
- Barcode / legal copy placement requirements
- Vendor print profile and tolerances

## Information hierarchy for first design iteration
### Front
1. UD logo / brand
2. B6827
3. UD便捷無塑化劑透明雨衣 / 1入
4. PEVA材質
5. 可重複使用
6. 連帽加長設計
7. Product photo / usage visual

### Back
1. Product facts and materials
2. Usage / quantity / dimensions
3. Cleaning and storage
4. Feature explanation
5. Shelf-life statement
6. Country of origin
7. Required regulatory / barcode fields only after verified source is supplied

## Test objective
Validate that the Packaging Design OS can ingest a real new-product slide, preserve supplied facts, route the package structure, expose missing production inputs, and stop before unsupported production geometry is invented.

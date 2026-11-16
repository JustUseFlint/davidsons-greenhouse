# Process the greenhouse's own website photos: auto-orient, strip EXIF/GPS, 800 + up-to-1600 JPG/WebP, never upscale.
from PIL import Image, ImageOps
import os, json, glob
SRC = '/workspace/davidsons-greenhouse-ref/orig/'; OUT = '/workspace/davidsons-greenhouse/assets/img/'
files = sorted(f for f in os.listdir(SRC) if not f.endswith('.pdf'))
MAP = {1:'perennial-bench',2:'seed-sprouter',3:'agave-pots-fall',4:'sunset-field',5:'venus-flytrap',6:'succulent-basket',
 7:'fall-truck',8:'air-plants',9:'cactus-collection',10:'succulent-dish-gardens',11:'greenhouse-interior',13:'poinsettias',
 14:'wreath-bundles',15:'ponytail-dish-garden',16:'mini-succulents',18:'annual-display',19:'truck-wreath',20:'fairy-garden',
 21:'seed-starting',22:'garden-supplies',24:'seedling-benches',27:'water-garden',28:'teapot-planters',29:'jar-planters',
 30:'ranunculus',31:'ice-plant-basket',32:'flowering-cactus',33:'truck-pumpkins',34:'pumpkins-gourds',36:'aloe-display',
 37:'hoya',38:'christmas-bench',39:'succulent-wreath',40:'bulk-beans',41:'gift-certificate',42:'seed-packets',44:'seed-potatoes',
 45:'mulch',46:'cactus-trio',47:'nursery-trees',49:'herb-bundles',50:'flats',51:'pansy',52:'pink-mum',53:'tub-succulents',
 58:'fall-display',59:'greenhouse-panorama'}
dims = {}
for i, name in MAP.items():
    im = ImageOps.exif_transpose(Image.open(SRC + files[i])).convert('RGB')
    clean = Image.new('RGB', im.size); clean.paste(im)
    for tag, target in (('800', 800), ('1600', 1600)):
        w = min(target, clean.width); h = round(clean.height * w / clean.width)
        r = clean.resize((w, h), Image.LANCZOS) if w != clean.width else clean
        r.save(f'{OUT}{name}-{tag}.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
        r.save(f'{OUT}{name}-{tag}.webp', 'WEBP', quality=78, method=6)
        dims[name] = [clean.width, clean.height]
json.dump(dims, open('/workspace/davidsons-greenhouse/_build/img-dims.json', 'w'), indent=1)
# verify no EXIF
bad = []
for f in glob.glob(OUT + '*'):
    x = Image.open(f)
    if x.getexif() or 'exif' in x.info: bad.append(f)
print(len(dims), 'images; exif leftovers:', bad)

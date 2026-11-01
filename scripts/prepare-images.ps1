# Copies original product photos from /images into the site, organised per product,
# converting heavy PNGs to web-friendly JPGs (max 1400px). Originals are never modified.
# Usage:  powershell -ExecutionPolicy Bypass -File scripts\prepare-images.ps1
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root "images\My_"
$dest = Join-Path $root "site\assets\products"

# product slug -> ordered list of source files (first = main photo)
$map = [ordered]@{
  "sr-71-blackbird"     = @("IMG_1229.JPG","196844D2-2D5B-4754-8546-441348C90E3A.png","B09CE895-90B9-426D-85AA-4CBB8F5DA607.png","IMG_1228.JPG")
  "f-22-raptor"         = @("IMG_1466.JPG","IMG_1467.JPG","IMG_1465.JPG","87988499-4AE2-4C25-8896-23E68F90CBB8.png","D406E486-584F-4A40-9F4E-4008B2AC40A5.png")
  "j-10-vigorous-dragon"= @("IMG_1194.JPG","IMG_1193.JPG","IMG_1195.JPG","97E41BD6-DA3B-4603-887D-39027B4872D3.png")
  "f-16-black-viper"    = @("IMG_1198.JPG","IMG_1197.JPG","IMG_1196.JPG")
  "mq-1-predator"       = @("IMG_1201.JPG","IMG_1200.JPG","IMG_1199.JPG")
  "uh-60-black-hawk"    = @("98630C1A-3BF1-4EF1-AC71-4ACD6AC676F6.png","IMG_1206.JPG","IMG_1204.JPG","IMG_1205.JPG")
  "f-35c-lightning-ii"  = @("IMG_1233.JPG","IMG_1230.JPG","IMG_1231.JPG","IMG_1234.JPG","IMG_1235.JPG","IMG_1236.JPG")
  "liaoning-cv-16"      = @("IMG_1258.JPG","IMG_1259.JPG","IMG_1261.JPG","IMG_1260.JPG","IMG_1262.JPG","IMG_1263.JPG")
  "j-10-camo"           = @("IMG_1266.JPG","IMG_1264.JPG","IMG_1265.JPG")
  "f-16-thunderbirds"   = @("IMG_1271.JPG","IMG_1270.JPG","IMG_1272.JPG","IMG_1273.JPG")
  "f-14-tomcat"         = @("IMG_1284.JPG","IMG_1274.JPG","IMG_1275.JPG","IMG_1281.JPG","IMG_1283.JPG","IMG_1285.JPG")
  "b-25-mitchell"       = @("IMG_1461.JPG","IMG_1286.JPG","IMG_1287.JPG","IMG_1288.JPG","IMG_1459.JPG","IMG_1460.JPG")
  "p-51d-mustang"       = @("IMG_1289.JPG","IMG_1290.JPG","IMG_1291.JPG")
  "z-19-black-whirlwind"= @("IMG_1453.JPG","IMG_1451.JPG","IMG_1452.JPG")
  "z-10-fierce-thunderbolt" = @("IMG_1458.JPG","IMG_1454.JPG","IMG_1455.JPG","IMG_1456.JPG","IMG_1457.JPG")
  "su-57-felon"         = @("IMG_1471.JPG","IMG_1468.JPG","IMG_1469.JPG","IMG_1470.JPG","IMG_1472.JPG","IMG_1612.JPG","IMG_1613.JPG")
  "j-20-mighty-dragon"  = @("IMG_1619.JPG","IMG_1614.JPG","IMG_1615.JPG","IMG_1616.JPG","IMG_1617.JPG","IMG_1618.JPG","IMG_1620.JPG","IMG_1621.JPG","IMG_1622.JPG")
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 84L
$max = 1400

foreach ($slug in $map.Keys) {
  $dir = Join-Path $dest $slug
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $n = 1
  foreach ($f in $map[$slug]) {
    $in  = Join-Path $src $f
    $out = Join-Path $dir ("{0}.jpg" -f $n)
    $img = [System.Drawing.Image]::FromFile($in)
    if ($f.ToLower().EndsWith(".jpg") -and $img.Width -le $max -and $img.Height -le $max) {
      $img.Dispose(); Copy-Item $in $out -Force
    } else {
      $r = [Math]::Min(1.0, [Math]::Min($max / $img.Width, $max / $img.Height))
      $w = [int]($img.Width * $r); $h = [int]($img.Height * $r)
      $bmp = New-Object System.Drawing.Bitmap $w, $h
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.Clear([System.Drawing.Color]::White)
      $g.InterpolationMode = "HighQualityBicubic"
      $g.DrawImage($img, 0, 0, $w, $h)
      $bmp.Save($out, $codec, $params)
      $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    }
    $n++
  }
  Write-Output ("{0}: {1} images" -f $slug, ($n - 1))
}

# Hero / social images
Copy-Item (Join-Path $src "IMG_1261.JPG") (Join-Path $root "site\assets\hero-carrier.jpg") -Force
Copy-Item (Join-Path $src "IMG_1260.JPG") (Join-Path $root "site\assets\deck.jpg") -Force

# ---------------------------------------------------------------------------
# Square versions (sq/<n>.jpg) for cards & galleries: the photo is centred on a
# square canvas and the empty bands are filled by stretching the photo's own edge
# pixels, so the studio backdrop continues seamlessly (no letterbox bars).
# ---------------------------------------------------------------------------
$size = 900
$attr = New-Object System.Drawing.Imaging.ImageAttributes
$attr.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
function Draw($g, $img, $dx, $dy, $dw, $dh, $sx, $sy, $sw, $sh) {
  if ($dw -le 0 -or $dh -le 0) { return }
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle ([int]$dx), ([int]$dy), ([int]$dw), ([int]$dh)), $sx, $sy, $sw, $sh, [System.Drawing.GraphicsUnit]::Pixel, $attr)
}
foreach ($slug in $map.Keys) {
  $dir = Join-Path $dest $slug
  $sq = Join-Path $dir "sq"
  New-Item -ItemType Directory -Force -Path $sq | Out-Null
  Get-ChildItem $dir -Filter *.jpg | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $r = [Math]::Min($size / $img.Width, $size / $img.Height)
    $w = [int][Math]::Round($img.Width * $r); $h = [int][Math]::Round($img.Height * $r)
    $x = [int](($size - $w) / 2); $y = [int](($size - $h) / 2)
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = "HighQualityBicubic"; $g.PixelOffsetMode = "Half"
    if ($w -lt $size) {        # portrait → extend left/right edge columns (3px strip)
      Draw $g $img 0 0 ($x + 1) $size 0 0 3 $img.Height
      Draw $g $img ($x + $w - 1) 0 ($size - $x - $w + 1) $size ($img.Width - 3) 0 3 $img.Height
    } elseif ($h -lt $size) {  # landscape → extend top/bottom edge rows
      Draw $g $img 0 0 $size ($y + 1) 0 0 $img.Width 3
      Draw $g $img 0 ($y + $h - 1) $size ($size - $y - $h + 1) 0 ($img.Height - 3) $img.Width 3
    }
    Draw $g $img $x $y $w $h 0 0 $img.Width $img.Height
    $bmp.Save((Join-Path $sq $_.Name), $codec, $params)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  }
}
Write-Output "Square versions generated."

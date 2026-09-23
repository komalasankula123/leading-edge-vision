Add-Type -AssemblyName System.Drawing

$src = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\.user_uploaded\media_1789994942421.jpg"
$img = [System.Drawing.Bitmap]::FromFile($src)
Write-Output "Mockup size: $($img.Width) x $($img.Height)"

# In media_1789994942421.jpg:
# Left half is Home page (X: 0 to ~0.50)
# Right half is About Us page (X: ~0.51 to 1.0)
# In About Us page, Anil Raj's photo is at X: ~0.83, Y: ~0.31, W: ~0.14, H: ~0.18
$cropX = [int]($img.Width * 0.83)
$cropY = [int]($img.Height * 0.315)
$cropW = [int]($img.Width * 0.138)
$cropH = [int]($img.Height * 0.18)

$rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$anil = $img.Clone($rect, $img.PixelFormat)
$anil.Save("D:\Desktop\Leading Edge Vision\assets\images\anil-raj-portrait.png", [System.Drawing.Imaging.ImageFormat]::Png)
$anil.Dispose()

# Also crop Anand Kumar if on the second card (X: ~0.84, Y: ~0.61, W: ~0.13, H: ~0.18)
$crop2X = [int]($img.Width * 0.84)
$crop2Y = [int]($img.Height * 0.615)
$crop2W = [int]($img.Width * 0.125)
$crop2H = [int]($img.Height * 0.18)

$rect2 = [System.Drawing.Rectangle]::new($crop2X, $crop2Y, $crop2W, $crop2H)
$anand = $img.Clone($rect2, $img.PixelFormat)
$anand.Save("D:\Desktop\Leading Edge Vision\assets\images\anand-kumar-about.png", [System.Drawing.Imaging.ImageFormat]::Png)
$anand.Dispose()

# Also crop RAJ GROUP logo from top left of About page or Home page (X: ~0.53, Y: ~0.008, W: ~0.05, H: ~0.04)
$logoX = [int]($img.Width * 0.535)
$logoY = [int]($img.Height * 0.007)
$logoW = [int]($img.Width * 0.045)
$logoH = [int]($img.Height * 0.042)

$rect3 = [System.Drawing.Rectangle]::new($logoX, $logoY, $logoW, $logoH)
$logo = $img.Clone($rect3, $img.PixelFormat)
$logo.Save("D:\Desktop\Leading Edge Vision\assets\images\raj-group-nav-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$logo.Dispose()

$img.Dispose()
Write-Output "Cropping complete."

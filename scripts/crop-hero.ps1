Add-Type -AssemblyName System.Drawing

$src = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\.user_uploaded\media_1789994942421.jpg"
$img = [System.Drawing.Bitmap]::FromFile($src)
Write-Output "Mockup: $($img.Width) x $($img.Height)"

# In media_1789994942421.jpg:
# The About Us page is from X: ~520 to ~1024, Y: 0 to 682
# The hero banner is at X: ~521, Y: ~40, W: ~495, H: ~165
# The photo part of the hero banner is at X: ~700 to ~1015, Y: ~40 to ~205
$cropX = [int]($img.Width * 0.68)
$cropY = [int]($img.Height * 0.058)
$cropW = [int]($img.Width * 0.315)
$cropH = [int]($img.Height * 0.245)

$rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$hero = $img.Clone($rect, $img.PixelFormat)
$hero.Save("D:\Desktop\Leading Edge Vision\assets\images\about-hero-fuji.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$hero.Dispose()

# Also let's crop the entire hero banner (including the text block and the photo) to see it
$fullHeroRect = [System.Drawing.Rectangle]::new([int]($img.Width * 0.515), [int]($img.Height * 0.058), [int]($img.Width * 0.48), [int]($img.Height * 0.245))
$fullHero = $img.Clone($fullHeroRect, $img.PixelFormat)
$fullHero.Save("D:\Desktop\Leading Edge Vision\assets\images\about-hero-full-mock.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$fullHero.Dispose()

$img.Dispose()
Write-Output "Cropped about-hero-fuji.jpg and about-hero-full-mock.jpg"

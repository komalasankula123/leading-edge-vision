Add-Type -AssemblyName System.Drawing

$src = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\.user_uploaded\media_1789994799626.png"
$img = [System.Drawing.Bitmap]::FromFile($src)
Write-Output "Image size: $($img.Width) x $($img.Height)"

# The RAJ GROUP logo is at the top center
# Let's crop the logo
$cropX = [int]($img.Width * 0.25)
$cropY = [int]($img.Height * 0.02)
$cropW = [int]($img.Width * 0.35)
$cropH = [int]($img.Height * 0.35)

$rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$logo = $img.Clone($rect, $img.PixelFormat)
$logo.Save("D:\Desktop\Leading Edge Vision\assets\images\raj-group-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$logo.Dispose()

# Also save the full business card as a clean asset
$img.Save("D:\Desktop\Leading Edge Vision\assets\images\raj-group-business-card.png", [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
Write-Output "Successfully saved raj-group-logo.png and raj-group-business-card.png"

Add-Type -AssemblyName System.Drawing

$src = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\.user_uploaded\media_1789996234106.png"
$img = [System.Drawing.Bitmap]::FromFile($src)
Write-Output "Overview mockup size: $($img.Width) x $($img.Height)"

# In media_1789996234106.png:
# Left image is at X: ~0.04 to ~0.53, Y: ~0.09 to ~0.91
$cropX = [int]($img.Width * 0.04)
$cropY = [int]($img.Height * 0.095)
$cropW = [int]($img.Width * 0.485)
$cropH = [int]($img.Height * 0.81)

$rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$photo = $img.Clone($rect, $img.PixelFormat)
$photo.Save("D:\Desktop\Leading Edge Vision\assets\images\tokyo-tower-fuji-overview.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$photo.Dispose()

$img.Dispose()
Write-Output "Successfully cropped tokyo-tower-fuji-overview.jpg"

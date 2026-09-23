Add-Type -AssemblyName System.Drawing

$srcFile = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\.user_uploaded\media_1789992327840.png"
$outFile = "D:\Desktop\Leading Edge Vision\assets\images\kimono-thank-you.png"

$img = [System.Drawing.Bitmap]::FromFile($srcFile)
$cropX = [int]($img.Width * 0.58)
$cropY = 0
$cropW = [int]($img.Width * 0.35)
$cropH = [int]($img.Height * 0.57)

$rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$cropped = $img.Clone($rect, $img.PixelFormat)
$cropped.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)

$cropped.Dispose()
$img.Dispose()

Write-Output "Successfully cropped and saved kimono-thank-you.png"

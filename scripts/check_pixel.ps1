Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("d:\Desktop\Leading Edge Vision\assets\images\japanese-welcome-transparent.png")
$corner = $bmp.GetPixel(10, 10)
Write-Output ("Corner pixel: R={0} G={1} B={2} A={3}" -f $corner.R, $corner.G, $corner.B, $corner.A)
$bmp.Dispose()

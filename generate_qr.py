import os
import qrcode
from PIL import Image

def generate_card_qr(url="https://card.mahantsoftware.com", output_path="assets/mahant_software_qr.png", logo_path="assets/logo.png"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Generate QR Code with high error correction for logo embedding
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=16,
        border=3,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Custom styling: Modern brand dark navy / deep purple-blue fill
    fill_color = "#0B1528"
    back_color = "#FFFFFF"

    qr_img = qr.make_image(fill_color=fill_color, back_color=back_color).convert("RGBA")
    
    # Try embedding logo if exists
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA")
            # Resize logo to fit nicely in center (~22% of QR width)
            qr_w, qr_h = qr_img.size
            logo_size = int(qr_w * 0.22)
            logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
            
            # Create a circular or rounded white background for the logo
            from PIL import ImageDraw
            bg_size = logo_size + 16
            bg = Image.new("RGBA", (bg_size, bg_size), (255, 255, 255, 0))
            draw = ImageDraw.Draw(bg)
            draw.rounded_rectangle([0, 0, bg_size, bg_size], radius=16, fill="white", outline="#0B1528", width=2)
            
            # Paste logo onto bg
            bg.paste(logo, (8, 8), mask=logo.split()[3] if len(logo.split()) > 3 else None)
            
            # Position at center of QR
            pos_x = (qr_w - bg_size) // 2
            pos_y = (qr_h - bg_size) // 2
            qr_img.paste(bg, (pos_x, pos_y), mask=bg)
            print("Logo embedded successfully!")
        except Exception as e:
            print(f"Error embedding logo: {e}")

    qr_img.save(output_path, "PNG", quality=100)
    print(f"QR Code successfully created at: {output_path} (Resolution: {qr_img.size})")

if __name__ == "__main__":
    generate_card_qr()

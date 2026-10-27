# NC Electronic Recycling business cards

- `/card/`: public business card with the existing website's general contact details.
- `/card/share/`: phone-friendly QR display and downloadable SVG for print.
- `/card/contact.vcf`: vCard 3.0 contact download.
- `/card/qr.svg`: static QR encoding `https://ncelectronicrecycling.com/card/` with error correction Q and a four-module quiet zone.

These static pages work with the site's existing GitHub Pages hosting. There are no third-party QR services, visitor accounts, tracking scripts, or subscription dependencies. The domain and `/card/` path must remain available for printed codes to keep working.

Edit `index.html` and `contact.vcf` together when business contact details change. The QR does not need changing while the URL stays the same. Test Save Contact on iPhone and Android before distributing cards; the phone handles the final contact import.

For employee cards, add a permanent folder such as `/card/dan/` with verified employee details and a matching vCard, then generate a separate QR encoding that exact public URL. Do not use the general card QR for an employee-specific card.

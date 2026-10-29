/* Account-specific contact exports. No visitor account access or tracking is used. */
(() => {
  'use strict';
  const trigger = document.querySelector('[data-contact-options]');
  if (!trigger || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  const vcard = new URL(trigger.href, window.location.href);
  if (vcard.origin !== window.location.origin) return;
  const filename = trigger.getAttribute('download') || 'Contact.vcf';
  const dialog = document.createElement('dialog');
  dialog.className = 'contact-dialog';
  dialog.setAttribute('aria-labelledby', 'contact-options-title');
  dialog.setAttribute('aria-describedby', 'contact-options-description');
  dialog.innerHTML = `
    <div class="contact-dialog-heading"><h2 id="contact-options-title">Add to contacts</h2><button type="button" class="contact-close" aria-label="Close contact options" autofocus>×</button></div>
    <p id="contact-options-description">Where would you like to save this contact?</p>
    <div class="contact-destinations" aria-label="Contact destination">
      <button type="button" class="contact-choice" data-provider="microsoft" aria-pressed="false" aria-controls="contact-microsoft"><strong>Microsoft 365 / Outlook</strong><span>Save to your work, school, or Outlook account.</span></button>
      <button type="button" class="contact-choice" data-provider="google" aria-pressed="false" aria-controls="contact-google"><strong>Google Contacts</strong><span>Save to the Google account you choose.</span></button>
      <button type="button" class="contact-choice" data-provider="device" aria-pressed="false" aria-controls="contact-device"><strong>Phone / Apple / other contact app</strong><span>Use a standard vCard contact file.</span></button>
    </div>
    <section id="contact-microsoft" class="contact-instructions" aria-labelledby="contact-microsoft-title" hidden>
      <h3 id="contact-microsoft-title">Save to Microsoft 365 / Outlook</h3>
      <ol><li>Download the Outlook CSV file below.</li><li>Open Outlook People and sign in to the <strong>work or school account</strong> where you want this contact saved.</li><li>Choose <strong>Manage contacts → Import contacts</strong>, select the downloaded CSV file, and import it.</li></ol>
      <a class="button primary" data-outlook-download>1. Download Outlook contact (.csv) <span aria-hidden="true">↓</span></a>
      <a class="button contact-open" href="https://outlook.office.com/people/" target="_blank" rel="noopener noreferrer">2. Open Microsoft 365 People ↗</a>
      <p class="contact-help">Using a personal Microsoft account? <a href="https://outlook.live.com/people/" target="_blank" rel="noopener noreferrer">Open Outlook.com People</a>. If Import contacts is unavailable on your phone, use Outlook in a desktop browser.</p>
      <a class="contact-help-link" href="https://support.microsoft.com/en-us/outlook/people/import-or-export-contacts-in-outlook-using-a-csv-file" target="_blank" rel="noopener noreferrer">Microsoft’s import instructions ↗</a>
    </section>
    <section id="contact-google" class="contact-instructions" aria-labelledby="contact-google-title" hidden>
      <h3 id="contact-google-title">Save to Google Contacts</h3>
      <ol><li>Download the vCard file below.</li><li>Open Google Contacts and select the <strong>Google account</strong> where you want this contact saved.</li><li>Choose <strong>Import → Select file</strong>, select the downloaded .vcf file, and import it.</li></ol>
      <a class="button primary" data-vcard-download>1. Download Google contact (.vcf) <span aria-hidden="true">↓</span></a>
      <a class="button contact-open" href="https://contacts.google.com/" target="_blank" rel="noopener noreferrer">2. Open Google Contacts ↗</a>
      <p class="contact-help">If Import is unavailable on your phone, use Google Contacts in a desktop browser. You can also import the vCard through your Google Contacts app and choose the destination account.</p>
      <a class="contact-help-link" href="https://support.google.com/contacts/answer/15147365?hl=en" target="_blank" rel="noopener noreferrer">Google’s import instructions ↗</a>
    </section>
    <section id="contact-device" class="contact-instructions" aria-labelledby="contact-device-title" hidden>
      <h3 id="contact-device-title">Save to your phone or another app</h3>
      <p>Open the vCard with your preferred contacts app, review the details, and choose where to save it. Your device or app controls the destination account.</p>
      <a class="button primary" data-vcard-download>Download contact (.vcf) <span aria-hidden="true">↓</span></a>
    </section>
    <p class="contact-privacy">Downloading a file does not add the contact yet. You finish the import in your chosen account; this card never accesses your contacts or sign-in details.</p>`;
  const outlook = dialog.querySelector('[data-outlook-download]');
  outlook.href = new URL('contact-outlook.csv', vcard).href;
  outlook.download = filename.replace(/\.vcf$/i, '') + '-Outlook.csv';
  for (const link of dialog.querySelectorAll('[data-vcard-download]')) {
    link.href = vcard.href;
    link.download = filename;
  }
  for (const button of dialog.querySelectorAll('[data-provider]')) {
    button.addEventListener('click', () => {
      for (const choice of dialog.querySelectorAll('[data-provider]')) choice.setAttribute('aria-pressed', String(choice === button));
      for (const panel of dialog.querySelectorAll('.contact-instructions')) panel.hidden = panel.id !== 'contact-' + button.dataset.provider;
      dialog.querySelector('#contact-' + button.dataset.provider).scrollIntoView({ block: 'nearest' });
    });
  }
  dialog.querySelector('.contact-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close(); } });
  document.body.appendChild(dialog);
  trigger.addEventListener('click', event => {
    event.preventDefault();
    for (const button of dialog.querySelectorAll('[data-provider]')) button.setAttribute('aria-pressed', 'false');
    for (const panel of dialog.querySelectorAll('.contact-instructions')) panel.hidden = true;
    dialog.showModal();
  });
})();

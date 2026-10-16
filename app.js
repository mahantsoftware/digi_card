// Digital Business Card Application Engine - Mahant Software
document.addEventListener('DOMContentLoaded', () => {
  // Current Profile Configuration
  const profile = {
    name: "Mahant Software - Yash Panchal",
    company: "Mahant Software",
    contactPerson: "Yash Panchal",
    owner: "Yash Panchal (Founder & Tech Solutions)",
    tagline: "Custom Software, Mobile Apps & Digital Solutions",
    bio: "Mahant Software is a modern IT development studio specializing in high-performance web applications, mobile apps, digital business cards, and end-to-end automation for growing businesses.",
    phone: "+91 9004168049",
    phoneDisplay: "+91 90041 68049",
    phoneClean: "919004168049",
    email: "mahantsoftware@gmail.com",
    website: "http://mahantsoftware.com/",
    cardUrl: window.location.href.split('?')[0].replace(/\/$/, '') || "http://mahantsoftware.com/",
    address: "1006, 10th floor, DGS Sheetal Sahyog Building, Opp Laxman Nagar Police Station, Kurar village, Malad East, Mumbai - 400097",
    landmark: "St. Francis School Main Gate",
    location: "Malad East, Mumbai, Maharashtra, India",
    rating: 5.0,
    reviewCount: 48,
    services: [
      {
        title: "Custom Web Applications",
        description: "High speed, modern, mobile-responsive web platforms, portals and eCommerce solutions.",
        icon: "ri-global-line"
      },
      {
        title: "Mobile App Development",
        description: "Cross-platform Android & iOS applications with clean UX, offline sync and cloud integration.",
        icon: "ri-smartphone-line"
      },
      {
        title: "Digital Visiting Cards & Smart NFC",
        description: "Smart paperless business cards with 1-click WhatsApp, vCard save and QR codes.",
        icon: "ri-qr-code-line"
      },
      {
        title: "Business Automation & ERP",
        description: "Custom billing, inventory, client management and workflow automation software.",
        icon: "ri-cpu-line"
      },
      {
        title: "SEO & Brand Identity",
        description: "Search engine visibility, Google My Business optimization and digital branding.",
        icon: "ri-line-chart-line"
      }
    ],
    portfolio: [
      {
        name: "Ambition Couriers",
        category: "Logistics & Tracking System",
        icon: "ri-truck-line"
      },
      {
        name: "Kalpana's Cakes & Bakes",
        category: "Bakery Order & Delivery System",
        icon: "ri-cake-3-line"
      },
      {
        name: "Jassi Perfumes",
        category: "Luxury E-Commerce Catalog",
        icon: "ri-store-2-line"
      },
      {
        name: "Makrel Engineering",
        category: "Industrial Portfolio & Quotation",
        icon: "ri-tools-line"
      }
    ],
    testimonials: [
      {
        author: "Bhavesh Patel",
        company: "Kalpana's Cakes & Bakes",
        text: "Mahant Software delivered our website and digital card on time. Our clients love the 1-click WhatsApp order feature!",
        rating: 5
      },
      {
        author: "Rajesh Sharma",
        company: "Ambition Couriers",
        text: "Exceptional service and quick turnaround. The digital card and quotation system saved our team hours every week.",
        rating: 5
      },
      {
        author: "Ankit Mehta",
        company: "Makrel Engineering",
        text: "Super professional team. Having a QR code digital card makes networking at expos and trade fairs effortless.",
        rating: 5
      }
    ]
  };

  // 1. Tab Switching Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      tabPanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Smooth scroll to top of tabs if needed
      const tabsNav = document.getElementById('cardTabs');
      if (tabsNav) {
        tabsNav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // 2. Render Services List
  const servicesContainer = document.getElementById('servicesList');
  if (servicesContainer) {
    servicesContainer.innerHTML = profile.services.map(s => `
      <div class="service-item">
        <div class="service-icon-wrap">
          <i class="${s.icon}"></i>
        </div>
        <div class="service-details">
          <h4>${s.title}</h4>
          <p>${s.description}</p>
        </div>
      </div>
    `).join('');
  }

  // 3. Render Portfolio Grid
  const portfolioContainer = document.getElementById('portfolioGrid');
  if (portfolioContainer) {
    portfolioContainer.innerHTML = profile.portfolio.map(p => `
      <div class="project-card">
        <div class="project-thumb">
          <i class="${p.icon}"></i>
        </div>
        <div class="project-info">
          <h4 class="project-title">${p.name}</h4>
          <span class="project-category">${p.category}</span>
        </div>
      </div>
    `).join('');
  }

  // 4. Render Testimonials List
  const testimonialsContainer = document.getElementById('testimonialsList');
  function renderTestimonials() {
    if (!testimonialsContainer) return;
    testimonialsContainer.innerHTML = profile.testimonials.map(t => `
      <div class="review-card">
        <div class="review-card-head">
          <div>
            <h4 class="reviewer-name">${t.author}</h4>
            <span class="reviewer-company">${t.company}</span>
          </div>
          <div class="stars">
            ${Array(t.rating).fill('<i class="ri-star-fill"></i>').join('')}
          </div>
        </div>
        <p class="review-card-body">${t.text}</p>
      </div>
    `).join('');
  }
  renderTestimonials();

  // 5. Save to Phonebook (Direct 1-Click for iOS & Android)
  async function saveContactToPhone(e) {
    if (e && e.preventDefault) e.preventDefault();

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Standard vCard 3.0 formatting strictly formatted for maximum mobile phonebook compatibility
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'PRODID:-//Mahant Software//Digital Card//EN',
      'N:;Mahant Software - Yash Panchal;;;',
      'FN:Mahant Software - Yash Panchal',
      'ORG:Mahant Software',
      'TITLE:Founder & Lead Developer',
      'TEL;TYPE=CELL,VOICE,PREF:+919004168049',
      'TEL;TYPE=WORK,VOICE:+919004168049',
      'EMAIL;TYPE=INTERNET,WORK,PREF:mahantsoftware@gmail.com',
      'URL;TYPE=WORK:http://mahantsoftware.com/',
      'ADR;TYPE=WORK,POSTAL,PARCEL:;;1006, 10th floor, DGS Sheetal Sahyog Building, Opp Laxman Nagar Police Station, Kurar village;Malad East, Mumbai;Maharashtra;400097;India',
      'LABEL;TYPE=WORK:1006, 10th floor, DGS Sheetal Sahyog Building, Opp Laxman Nagar Police Station, Kurar village, Malad East, Mumbai - 400097. Landmark: St. Francis School Main Gate',
      'NOTE:Mahant Software - Yash Panchal\\nPhone: +91 9004168049\\nEmail: mahantsoftware@gmail.com\\nWebsite: http://mahantsoftware.com/\\nAddress: 1006, 10th floor, DGS Sheetal Sahyog Building, Opp Laxman Nagar Police Station, Kurar village, Malad East, Mumbai - 400097\\nLandmark: St. Francis School Main Gate',
      'END:VCARD'
    ].join('\r\n');

    // Method 1: Web Share API (Primary for modern Android phones)
    // Passes the .vcf file directly into native contacts/share picker without downloading to disk
    try {
      const vcfBlob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
      const vcfFile = new File([vcfBlob], 'Mahant_Software_Yash_Panchal.vcf', { type: 'text/vcard' });

      if (!isIOS && navigator.canShare && navigator.canShare({ files: [vcfFile] })) {
        await navigator.share({
          files: [vcfFile],
          title: 'Mahant Software - Yash Panchal',
          text: 'Save Mahant Software - Yash Panchal to your contacts'
        });
        showToast('Tap Contacts to save directly to your phonebook!');
        return;
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // User dismissed the native dialog
        return;
      }
      console.log('Web Share fallback:', err);
    }

    // Method 2: iOS Safari Direct Navigation
    // Navigating directly to a .vcf file on iOS immediately opens the native Apple Contacts card sheet
    if (isIOS) {
      window.location.href = 'mahant_software.vcf';
      showToast('Opening contact card... Tap "Save" in top-right.');
      return;
    }

    // Method 3: Direct Download/Open Fallback (Desktop, older Android, or unsupported browsers)
    const vcfBlob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(vcfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Mahant_Software_Yash_Panchal.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    showToast('Contact opened! Tap to save directly.');
  }

  const btnDownloadVcard = document.getElementById('btnDownloadVcard');
  const bottomSaveBtn = document.getElementById('bottomSaveBtn');
  if (btnDownloadVcard) btnDownloadVcard.addEventListener('click', saveContactToPhone);
  if (bottomSaveBtn) bottomSaveBtn.addEventListener('click', saveContactToPhone);

  // 6. Copy Card Link
  const btnCopyCardLink = document.getElementById('btnCopyCardLink');
  if (btnCopyCardLink) {
    btnCopyCardLink.addEventListener('click', () => {
      const shareUrl = profile.cardUrl || window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('Card link copied to clipboard!');
        });
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Card link copied to clipboard!');
      }
    });
  }

  // 7. Native Share Integration
  function triggerShare() {
    const shareData = {
      title: `${profile.name} - Digital Business Card`,
      text: `Connect with ${profile.name} (${profile.tagline}). Tap the link below:`,
      url: profile.cardUrl || window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      // Fallback: trigger copy link
      if (btnCopyCardLink) btnCopyCardLink.click();
    }
  }

  const headerShareBtn = document.getElementById('headerShareBtn');
  const bottomShareBtn = document.getElementById('bottomShareBtn');
  if (headerShareBtn) headerShareBtn.addEventListener('click', triggerShare);
  if (bottomShareBtn) bottomShareBtn.addEventListener('click', triggerShare);

  // 8. Share via WhatsApp Form
  const whatsappShareForm = document.getElementById('whatsappShareForm');
  if (whatsappShareForm) {
    whatsappShareForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const numInput = document.getElementById('targetWhatsAppNumber');
      const cleanNum = numInput.value.replace(/[^0-9]/g, '');

      if (cleanNum.length === 10) {
        const targetNumber = '91' + cleanNum;
        const msg = encodeURIComponent(
          `*Hello!* Here is the official *Digital Business Card* of *${profile.name}*:\n\n` +
          `🌐 ${profile.cardUrl}\n\n` +
          `📞 Contact: ${profile.phone}\n` +
          `💼 Services: ${profile.tagline}\n\n` +
          `_Tap the link to save contact, view portfolio & connect instantly!_`
        );
        window.open(`https://wa.me/${targetNumber}?text=${msg}`, '_blank');
        numInput.value = '';
      } else {
        alert('Please enter a valid 10-digit mobile number.');
      }
    });
  }

  // 9. Review Modal & Submission
  const reviewModal = document.getElementById('reviewModal');
  const btnOpenReviewModal = document.getElementById('btnOpenReviewModal');
  const closeReviewModal = document.getElementById('closeReviewModal');
  const reviewForm = document.getElementById('reviewForm');
  let selectedRating = 5;

  if (btnOpenReviewModal && reviewModal) {
    btnOpenReviewModal.addEventListener('click', () => {
      reviewModal.classList.add('open');
    });
  }

  if (closeReviewModal && reviewModal) {
    closeReviewModal.addEventListener('click', () => {
      reviewModal.classList.remove('open');
    });
  }

  // Star selector
  const stars = document.querySelectorAll('#starRatingSelect i');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-rating'));
      stars.forEach(s => {
        const r = parseInt(s.getAttribute('data-rating'));
        if (r <= selectedRating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reviewName').value.trim();
      const company = document.getElementById('reviewCompany').value.trim();
      const text = document.getElementById('reviewFeedback').value.trim();

      if (name && text) {
        profile.testimonials.unshift({
          author: name,
          company: company || "Valued Client",
          text: text,
          rating: selectedRating
        });
        renderTestimonials();
        reviewForm.reset();
        reviewModal.classList.remove('open');
        showToast('Thank you! Your review has been submitted.');
      }
    });
  }

  // 10. Toast Notification Helper
  function showToast(msg) {
    const toast = document.getElementById('toastNotice');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
      toastMsg.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  }
});

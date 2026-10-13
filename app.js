// Digital Business Card Application Engine - Mahant Software
document.addEventListener('DOMContentLoaded', () => {
  // Current Profile Configuration
  const profile = {
    name: "Mahant Software",
    owner: "Business Development & Tech Solutions",
    tagline: "Custom Software, Mobile Apps & Digital Solutions",
    bio: "Mahant Software is a modern IT development studio specializing in high-performance web applications, mobile apps, digital business cards, and end-to-end automation for growing businesses.",
    phone: "+91 90041 68049",
    phoneClean: "919004168049",
    email: "contact@mahantsoftware.com",
    website: "https://mahantsoftware.com",
    cardUrl: window.location.href.split('?')[0].replace(/\/$/, '') || "https://card.mahantsoftware.com",
    location: "Gujarat, India",
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

  // 5. Download VCF (vCard Contact Card)
  function downloadVCard() {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.name}`,
      `ORG:${profile.name}`,
      `TITLE:${profile.owner}`,
      `TEL;TYPE=WORK,VOICE:${profile.phone}`,
      `TEL;TYPE=CELL,VOICE:${profile.phone}`,
      `EMAIL;TYPE=WORK:${profile.email}`,
      `URL;TYPE=WORK:${profile.website}`,
      `ADR;TYPE=WORK:;;${profile.location};;;;`,
      `NOTE:Smart Digital Business Card: ${profile.cardUrl}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Contact file downloaded! Tap to add to phonebook.');
  }

  const btnDownloadVcard = document.getElementById('btnDownloadVcard');
  const bottomSaveBtn = document.getElementById('bottomSaveBtn');
  if (btnDownloadVcard) btnDownloadVcard.addEventListener('click', downloadVCard);
  if (bottomSaveBtn) bottomSaveBtn.addEventListener('click', downloadVCard);

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

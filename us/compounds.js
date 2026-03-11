/* ═══════════════════════════════════════════
   ENGINEERED ADHERENCE — COMPOUND DATABASE
   Rich data, detail modal, toast system
   ═══════════════════════════════════════════ */

/* Body scroll-lock reference counter —
   multiple overlays (cart drawer, compound modal) can request lock;
   class is only removed when every requester has unlocked. */
let _bodyLockCount = 0;
function lockBody() {
  _bodyLockCount++;
  document.body.classList.add('menu-open');
}
function unlockBody() {
  _bodyLockCount = Math.max(0, _bodyLockCount - 1);
  if (_bodyLockCount === 0) document.body.classList.remove('menu-open');
}

const CompoundDB = {
  'bpc-157': {
    name: 'BPC-157',
    fullName: 'Body Protection Compound-157',
    pillar: 'Recovery', pillarNum: 'II', pillarIndex: 2,
    price: 89, size: '5mg', purity: '99.9%',
    tagline: 'Tissue repair. Anti-inflammatory. Tendon healing.',
    description: 'A pentadecapeptide derived from human gastric juice with demonstrated systemic healing activity across multiple preclinical models. BPC-157 accelerates tendon, muscle, ligament, and nerve tissue repair while modulating the inflammatory cascade and protecting gut mucosal integrity.',
    mechanism: 'Upregulates growth hormone receptors and promotes angiogenesis via VEGF pathway activation. Modulates nitric oxide synthesis and activates cytoprotective prostaglandin pathways. Demonstrated neuroprotective effects through GABAergic system interaction.',
    route: 'Subcutaneous', dosing: '250\u2013500mcg', frequency: '1\u20132x daily',
    benefits: ['Accelerated tissue repair', 'Anti-inflammatory', 'Gut mucosal healing', 'Tendon & ligament support'],
    synergies: ['TB-500', 'GHK-CU']
  },
  'ipamorelin': {
    name: 'IPAMORELIN',
    fullName: 'Growth Hormone Releasing Peptide',
    pillar: 'Performance', pillarNum: 'V', pillarIndex: 5,
    price: 112, size: '2mg', purity: '99.9%',
    tagline: 'Clean GH pulse. Recomposition. Recovery.',
    description: 'A selective growth hormone secretagogue that triggers pulsatile GH release without elevating cortisol, prolactin, or appetite. Considered the cleanest GHRP available, Ipamorelin mimics natural GH patterning for recomposition, recovery, and deep restorative sleep.',
    mechanism: 'Binds to ghrelin receptors in the anterior pituitary with high selectivity, triggering dose-dependent GH pulses. Does not affect ACTH, FSH, LH, PRL, or TSH at therapeutic doses, preserving endocrine homeostasis.',
    route: 'Subcutaneous', dosing: '200\u2013300mcg', frequency: '1x daily (pre-sleep)',
    benefits: ['Clean GH pulsation', 'Body recomposition', 'Deep sleep enhancement', 'Joint recovery'],
    synergies: ['CJC-1295', 'BPC-157']
  },
  'semax': {
    name: 'SEMAX',
    fullName: 'Synthetic ACTH Analog (4\u20137)',
    pillar: 'Cognitive', pillarNum: 'IV', pillarIndex: 4,
    price: 97, size: '30mg', purity: '99.9%',
    tagline: 'BDNF upregulation. Focus. Neuroprotection.',
    description: 'A synthetic heptapeptide analog of the ACTH(4\u20137) fragment, developed at the Institute of Molecular Genetics in Russia. Semax crosses the blood-brain barrier and has been studied extensively for cognitive enhancement, neuroprotection, and as an adjunct in stroke recovery.',
    mechanism: 'Increases BDNF and NGF expression in the hippocampus and prefrontal cortex. Modulates serotonergic and dopaminergic neurotransmission. Enhances gene expression related to neuronal survival and synaptic plasticity.',
    route: 'Intranasal', dosing: '200\u2013600mcg', frequency: '1\u20132x daily',
    benefits: ['BDNF upregulation', 'Enhanced focus & clarity', 'Neuroprotection', 'Mood stabilization'],
    synergies: ['SELANK', 'BPC-157']
  },
  'epithalon': {
    name: 'EPITHALON',
    fullName: 'Epitalon / Epithalamin Tetrapeptide',
    pillar: 'Longevity', pillarNum: 'I', pillarIndex: 1,
    price: 145, size: '10mg', purity: '99.9%',
    tagline: 'Telomerase activation. Cellular repair. Circadian reset.',
    description: 'A tetrapeptide based on the natural pineal gland peptide epithalamin. Epithalon is the only known compound to activate telomerase in human somatic cells, directly addressing one of the primary mechanisms of cellular aging.',
    mechanism: 'Activates telomerase reverse transcriptase (hTERT), extending telomere length in somatic cells. Regulates melatonin synthesis in the pineal gland, restoring circadian architecture. Modulates antioxidant enzyme expression.',
    route: 'Subcutaneous', dosing: '5\u201310mg', frequency: 'Daily (10\u201320 day cycles)',
    benefits: ['Telomerase activation', 'Circadian rhythm restoration', 'Antioxidant defense', 'Cellular longevity'],
    synergies: ['GHK-CU', 'BPC-157']
  },
  'tb-500': {
    name: 'TB-500',
    fullName: 'Thymosin Beta-4 Fragment',
    pillar: 'Recovery', pillarNum: 'II', pillarIndex: 2,
    price: 134, size: '5mg', purity: '99.9%',
    tagline: 'Systemic healing. Angiogenesis. Mobility.',
    description: 'A synthetic fragment of thymosin beta-4, a 43-amino-acid protein present in all human cells. TB-500 promotes cell migration and proliferation, accelerating healing across muscle, tendon, ligament, and skin tissue while reducing inflammatory fibrosis.',
    mechanism: 'Sequesters G-actin monomers, promoting intracellular actin polymerization critical for cell migration and wound healing. Upregulates angiogenic growth factors and reduces pro-inflammatory cytokine cascades. Promotes stem cell differentiation.',
    route: 'Subcutaneous', dosing: '2\u20135mg', frequency: '2x weekly',
    benefits: ['Systemic tissue repair', 'Angiogenesis', 'Reduced inflammation', 'Enhanced mobility'],
    synergies: ['BPC-157', 'GHK-CU']
  },
  'aod-9604': {
    name: 'AOD-9604',
    fullName: 'Anti-Obesity Drug Fragment 177\u2013191',
    pillar: 'Metabolic', pillarNum: 'III', pillarIndex: 3,
    price: 118, size: '5mg', purity: '99.9%',
    tagline: 'Targeted lipolysis. No hyperglycemia.',
    description: 'A modified fragment of the human growth hormone molecule (amino acids 177\u2013191). AOD-9604 retains the fat-reducing activity of hGH without its growth-promoting or diabetogenic effects, making it one of the most targeted lipolytic agents available.',
    mechanism: 'Stimulates lipolysis and inhibits lipogenesis in adipose tissue through beta-3 adrenergic receptor modulation. Increases fat oxidation without affecting IGF-1 levels, blood glucose, or insulin sensitivity. Supports cartilage regeneration.',
    route: 'Subcutaneous', dosing: '250\u2013500mcg', frequency: '1x daily (fasted)',
    benefits: ['Targeted fat reduction', 'No hyperglycemia risk', 'Cartilage support', 'Metabolic optimization'],
    synergies: ['IPAMORELIN', 'BPC-157']
  },
  'cjc-1295': {
    name: 'CJC-1295',
    fullName: 'Modified GRF (1\u201329) with DAC',
    pillar: 'Performance', pillarNum: 'V', pillarIndex: 5,
    price: 108, size: '2mg', purity: '99.9%',
    tagline: 'Sustained GH elevation. Lean mass. Fat metabolism.',
    description: 'A synthetic analog of growth hormone\u2013releasing hormone (GHRH) with a Drug Affinity Complex that extends its half-life from minutes to days. CJC-1295 provides sustained, elevated GH levels for extended anabolic and lipolytic effects.',
    mechanism: 'Binds to GHRH receptors on somatotroph cells, stimulating sustained GH release over 6\u20138 days per injection. The DAC modification prevents DPP-IV degradation, maintaining stable plasma concentrations. Amplifies endogenous GH pulsatility.',
    route: 'Subcutaneous', dosing: '1\u20132mg', frequency: '2x weekly',
    benefits: ['Sustained GH elevation', 'Lean mass accrual', 'Fat metabolism', 'Improved recovery'],
    synergies: ['IPAMORELIN', 'HEXARELIN']
  },
  'ghk-cu': {
    name: 'GHK-CU',
    fullName: 'Copper Tripeptide Complex',
    pillar: 'Longevity', pillarNum: 'I', pillarIndex: 1,
    price: 76, size: '50mg', purity: '99.9%',
    tagline: 'Collagen synthesis. Wound healing. Antioxidant.',
    description: 'A naturally occurring copper\u2013peptide complex found in human plasma, saliva, and urine. GHK-Cu declines with age and has demonstrated the ability to reset gene expression patterns to a younger state, modulating over 4,000 genes involved in tissue remodeling.',
    mechanism: 'Stimulates collagen I, III, and V synthesis. Activates metalloproteinases for ECM remodeling. Upregulates integrin expression for cell adhesion. Chelates copper ions to modulate SOD and catalase antioxidant pathways.',
    route: 'Subcutaneous / Topical', dosing: '1\u20132mg', frequency: 'Daily',
    benefits: ['Collagen synthesis', 'Gene expression reset', 'Wound acceleration', 'Antioxidant defense'],
    synergies: ['EPITHALON', 'TB-500']
  },
  'selank': {
    name: 'SELANK',
    fullName: 'Synthetic Tuftsin Analog',
    pillar: 'Cognitive', pillarNum: 'IV', pillarIndex: 4,
    price: 88, size: '5mg', purity: '99.9%',
    tagline: 'Anxiolytic. BDNF modulation. Calm focus.',
    description: 'A synthetic analog of the immunomodulatory peptide tuftsin, developed at the Institute of Molecular Genetics. Selank provides anxiolytic and nootropic effects without sedation or dependence, modulating the GABAergic system in a fundamentally different way than benzodiazepines.',
    mechanism: 'Modulates GABA-A receptor sensitivity and increases BDNF mRNA expression. Stabilizes enkephalin degradation, prolonging endogenous opioid-mediated calm. Enhances IL-6 expression for immune modulation without immunosuppression.',
    route: 'Intranasal', dosing: '250\u2013500mcg', frequency: '1\u20132x daily',
    benefits: ['Anxiolytic without sedation', 'BDNF modulation', 'Immune support', 'Cognitive clarity'],
    synergies: ['SEMAX', 'BPC-157']
  },
  'hexarelin': {
    name: 'HEXARELIN',
    fullName: 'Growth Hormone Releasing Hexapeptide',
    pillar: 'Performance', pillarNum: 'V', pillarIndex: 5,
    price: 129, size: '2mg', purity: '99.9%',
    tagline: 'Most potent GH secretagogue. Cardiac support.',
    description: 'The most potent synthetic growth hormone secretagogue available, eliciting the strongest GH pulse of any GHRP. Hexarelin also demonstrates cardioprotective properties independent of GH release, binding to cardiac-specific receptors.',
    mechanism: 'Activates both GHS-R1a and CD36 receptors. GHS-R1a activation in the pituitary triggers maximum GH discharge. CD36 binding provides direct cardioprotective effects through reduction of cardiac fibrosis and improved ventricular function.',
    route: 'Subcutaneous', dosing: '100\u2013200mcg', frequency: '1\u20132x daily',
    benefits: ['Maximum GH release', 'Cardioprotection', 'Lean mass support', 'Recovery acceleration'],
    synergies: ['CJC-1295', 'BPC-157']
  },
  'retatrutide': {
    name: 'RETATRUTIDE',
    fullName: 'Triple Incretin Agonist (GLP-1/GIP/GCGR)',
    pillar: 'Metabolic', pillarNum: 'III', pillarIndex: 3,
    price: 189, size: '10mg', purity: '99.9%',
    tagline: '24% body weight reduction. Phase 2 validated.',
    description: 'A triple hormone receptor agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. Phase 2 trials demonstrated unprecedented 24.2% body weight reduction at 48 weeks \u2014 the highest efficacy of any obesity therapeutic to date.',
    mechanism: 'Simultaneous agonism of three incretin pathways: GLP-1R for appetite suppression and glucose control, GIPR for enhanced insulin sensitivity, and GCGR for increased energy expenditure and hepatic lipid oxidation.',
    route: 'Subcutaneous', dosing: '1\u201312mg', frequency: '1x weekly',
    benefits: ['Unprecedented weight reduction', 'Triple-pathway targeting', 'Glucose regulation', 'Energy expenditure'],
    synergies: ['AOD-9604', 'BPC-157']
  },
  'mk-677': {
    name: 'MK-677',
    fullName: 'Ibutamoren Mesylate',
    pillar: 'Performance', pillarNum: 'V', pillarIndex: 5,
    price: 94, size: '10mg', purity: '99.9%',
    tagline: 'Oral GH secretagogue. Deep sleep. Lean mass.',
    description: 'A non-peptide, orally active growth hormone secretagogue that mimics ghrelin signaling to stimulate sustained GH and IGF-1 elevation. MK-677 is the only oral compound capable of raising GH to injectable GHRP levels, with 24-hour activity from a single dose.',
    mechanism: 'Binds to ghrelin/GHS receptors in the hypothalamus and pituitary, triggering pulsatile GH release. Increases IGF-1 levels by 40\u201390% within 2 weeks. Enhances slow-wave sleep architecture without affecting cortisol at physiological doses.',
    route: 'Oral', dosing: '10\u201325mg', frequency: '1x daily (evening)',
    benefits: ['Oral convenience', 'Sustained GH/IGF-1 elevation', 'Deep sleep enhancement', 'Lean mass accrual'],
    synergies: ['IPAMORELIN', 'BPC-157']
  }
};

/* ═══════════════════════════════════════════
   TOAST SYSTEM
   ═══════════════════════════════════════════ */
const Toast = {
  el: null,
  timer: null,

  init: function() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'ea-toast';
    this.el.setAttribute('role', 'status');
    this.el.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.el);
  },

  show: function(msg) {
    this.init();
    clearTimeout(this.timer);
    this.el.innerHTML = '<span class="ea-toast-check">\u2713</span> ' + msg;
    /* Force reflow for re-animation */
    this.el.classList.remove('visible');
    void this.el.offsetWidth;
    this.el.classList.add('visible');
    const self = this;
    this.timer = setTimeout(function() {
      self.el.classList.remove('visible');
    }, 2400);
  }
};

/* ═══════════════════════════════════════════
   COMPOUND MODAL
   ═══════════════════════════════════════════ */
const CompoundModal = {
  overlay: null,
  modal: null,
  built: false,

  build: function() {
    if (this.built) return;

    this.overlay = document.createElement('div');
    this.overlay.className = 'cmodal-overlay';
    this.overlay.addEventListener('click', function() { CompoundModal.close(); });

    this.modal = document.createElement('div');
    this.modal.className = 'cmodal';
    this.modal.innerHTML =
      '<div class="cmodal-bar"></div>' +
      '<div class="cmodal-inner">' +
        '<button class="cmodal-close" aria-label="Close detail panel">\u2715</button>' +
        '<div class="cmodal-head">' +
          '<span class="cmodal-pillar-num" id="cm-pillarnum"></span>' +
          '<span class="ptag" id="cm-tag"></span>' +
        '</div>' +
        '<div class="cmodal-name" id="cm-name"></div>' +
        '<div class="cmodal-fullname" id="cm-fullname"></div>' +
        '<p class="cmodal-desc" id="cm-desc"></p>' +
        '<div class="cmodal-mech">' +
          '<div class="cmodal-mech-label">Mechanism of Action</div>' +
          '<p class="cmodal-mech-text" id="cm-mech"></p>' +
        '</div>' +
        '<div class="cmodal-stats" id="cm-stats"></div>' +
        '<div class="cmodal-benefits" id="cm-benefits"></div>' +
        '<div class="cmodal-syn" id="cm-syn-wrap">' +
          '<div class="cmodal-syn-label">Synergistic Compounds</div>' +
          '<div class="cmodal-syn-list" id="cm-syn"></div>' +
        '</div>' +
        '<div class="cmodal-footer">' +
          '<div class="cmodal-price" id="cm-price"></div>' +
          '<button class="btn" id="cm-add">Add to Stack</button>' +
          '<button class="btn btn-ghost" id="cm-shop">View in Shop</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.modal);

    /* Close button */
    this.modal.querySelector('.cmodal-close').addEventListener('click', function() {
      CompoundModal.close();
    });

    /* Escape key */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && CompoundModal.modal.classList.contains('open')) {
        CompoundModal.close();
      }
    });

    /* Add to stack */
    document.getElementById('cm-add').addEventListener('click', function() {
      const slug = CompoundModal.currentSlug;
      const c = CompoundDB[slug];
      if (c && typeof Cart !== 'undefined' && Cart.add) {
        Cart.add({ name: c.name, slug: slug, price: c.price, pillar: c.pillar });
        Toast.show(c.name + ' added to stack');
      }
    });

    /* View in shop */
    document.getElementById('cm-shop').addEventListener('click', function() {
      CompoundModal.close();
      window.location.href = '/us/shop.html';
    });

    this.built = true;
  },

  currentSlug: null,

  open: function(slug) {
    this.build();

    const c = CompoundDB[slug];
    if (!c) return;

    this.currentSlug = slug;

    /* Set pillar data attribute for color */
    this.modal.setAttribute('data-pillar', String(c.pillarIndex));

    /* Populate */
    document.getElementById('cm-pillarnum').textContent = c.pillarNum;
    document.getElementById('cm-tag').textContent = 'Pillar ' + c.pillarNum + ' \u00b7 ' + c.pillar;
    document.getElementById('cm-name').textContent = c.name;
    document.getElementById('cm-fullname').textContent = c.fullName;
    document.getElementById('cm-desc').textContent = c.description;
    document.getElementById('cm-mech').textContent = c.mechanism;
    document.getElementById('cm-price').innerHTML = '$' + c.price + ' <span>/ ' + c.size + '</span>';

    /* Stats */
    document.getElementById('cm-stats').innerHTML =
      '<div class="cmodal-stat"><div class="cmodal-stat-label">Route</div><div class="cmodal-stat-val">' + c.route + '</div></div>' +
      '<div class="cmodal-stat"><div class="cmodal-stat-label">Dosing</div><div class="cmodal-stat-val">' + c.dosing + '</div></div>' +
      '<div class="cmodal-stat"><div class="cmodal-stat-label">Frequency</div><div class="cmodal-stat-val">' + c.frequency + '</div></div>';

    /* Benefits — built via DOM API to avoid innerHTML */
    const benefitsEl = document.getElementById('cm-benefits');
    benefitsEl.textContent = '';
    c.benefits.forEach(function(b) {
      const span = document.createElement('span');
      span.className = 'cmodal-benefit';
      span.textContent = b;
      benefitsEl.appendChild(span);
    });

    /* Synergies — built via DOM API to avoid innerHTML */
    const synEl = document.getElementById('cm-syn');
    synEl.textContent = '';
    c.synergies.forEach(function(s) {
      const synSlug = s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const btn = document.createElement('button');
      btn.className = 'cmodal-syn-pill';
      btn.setAttribute('data-syn', synSlug);
      btn.textContent = s;
      /* Click synergy pill -> open that compound */
      btn.addEventListener('click', function() {
        if (CompoundDB[synSlug]) {
          CompoundModal.open(synSlug);
        }
      });
      synEl.appendChild(btn);
    });

    /* Show */
    this.overlay.classList.add('open');
    this.modal.classList.add('open');
    lockBody();

    /* Focus the close button for keyboard accessibility */
    this.modal.querySelector('.cmodal-close').focus();
  },

  close: function() {
    if (this.overlay) this.overlay.classList.remove('open');
    if (this.modal) this.modal.classList.remove('open');
    unlockBody();
  }
};

/* ═══════════════════════════════════════════
   ENHANCED CART — Toast on add
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Cart !== 'undefined') {
    const originalAdd = Cart.add.bind(Cart);
    Cart.add = function(compound) {
      originalAdd(compound);
      Toast.show(compound.name + ' added to stack');
    };
  }
});

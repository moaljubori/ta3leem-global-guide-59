
import { SectionTemplate, SectionType } from "../types";

export const sectionTemplates: SectionTemplate[] = [
  {
    id: "hero-basic",
    title: "قسم ترحيبي بسيط",
    type: SectionType.Hero,
    description: "قسم ترحيبي بسيط مع عنوان وفقرة ترحيبية",
    preview: "/assets/templates/hero-basic.jpg",
    defaultContent: `# عنوان الترحيب الرئيسي
    
فقرة ترحيبية توضح الهدف الرئيسي من الصفحة أو الموقع بشكل مختصر ومفيد للزوار.
    
[تواصل معنا](#contact)`
  },
  {
    id: "hero-cta",
    title: "قسم ترحيبي مع زر للتحويل",
    type: SectionType.Hero,
    description: "قسم ترحيبي مع عنوان ونص ترحيبي وزر للدعوة لاتخاذ إجراء",
    preview: "/assets/templates/hero-cta.jpg",
    defaultContent: `# عنوان الترحيب المميز
    
فقرة ترحيبية توضح القيمة المقدمة للزائر وتشجعه على اتخاذ إجراء محدد.
    
[احجز استشارتك المجانية الآن](#booking)`
  },
  {
    id: "text-basic",
    title: "قسم نصي بسيط",
    type: SectionType.Text,
    description: "قسم نصي بسيط مع عنوان ومحتوى",
    preview: "/assets/templates/text-basic.jpg",
    defaultContent: `# عنوان القسم

هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.

## عنوان فرعي
إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص.`
  },
  {
    id: "features-basic",
    title: "قسم الميزات الأساسي",
    type: SectionType.Features,
    description: "قسم لعرض ميزات وخدمات الموقع بشكل منظم",
    preview: "/assets/templates/features-basic.jpg",
    defaultContent: `# ميزاتنا المتميزة

## الميزة الأولى
وصف تفصيلي للميزة الأولى وكيف تفيد المستخدم أو العميل.

## الميزة الثانية
وصف تفصيلي للميزة الثانية وكيف تفيد المستخدم أو العميل.

## الميزة الثالثة
وصف تفصيلي للميزة الثالثة وكيف تفيد المستخدم أو العميل.

## الميزة الرابعة
وصف تفصيلي للميزة الرابعة وكيف تفيد المستخدم أو العميل.`
  },
  {
    id: "cards-basic",
    title: "قسم البطاقات الأساسي",
    type: SectionType.Cards,
    description: "قسم لعرض المحتوى في شكل بطاقات متساوية",
    preview: "/assets/templates/cards-basic.jpg",
    defaultContent: `# عنوان قسم البطاقات

## البطاقة الأولى
محتوى البطاقة الأولى يوضع هنا مع إمكانية إضافة روابط أو صور.

## البطاقة الثانية
محتوى البطاقة الثانية يوضع هنا مع إمكانية إضافة روابط أو صور.

## البطاقة الثالثة
محتوى البطاقة الثالثة يوضع هنا مع إمكانية إضافة روابط أو صور.`
  },
  {
    id: "testimonials-basic",
    title: "قسم آراء العملاء",
    type: SectionType.Testimonials,
    description: "قسم لعرض آراء وتقييمات العملاء",
    preview: "/assets/templates/testimonials-basic.jpg",
    defaultContent: `# آراء عملائنا

## اسم العميل الأول
المسمى الوظيفي أو الشركة
"نص الشهادة أو التقييم الذي قدمه العميل عن الخدمة أو المنتج."

## اسم العميل الثاني
المسمى الوظيفي أو الشركة
"نص الشهادة أو التقييم الذي قدمه العميل عن الخدمة أو المنتج."

## اسم العميل الثالث
المسمى الوظيفي أو الشركة
"نص الشهادة أو التقييم الذي قدمه العميل عن الخدمة أو المنتج."`
  },
  {
    id: "contact-form-basic",
    title: "نموذج تواصل بسيط",
    type: SectionType.ContactForm,
    description: "نموذج تواصل بسيط للزوار",
    preview: "/assets/templates/contact-form-basic.jpg",
    defaultContent: `# تواصل معنا

يمكنك التواصل معنا من خلال تعبئة النموذج التالي وسنقوم بالرد عليك في أقرب وقت ممكن.`
  },
  {
    id: "gallery-basic",
    title: "معرض صور بسيط",
    type: SectionType.Gallery,
    description: "معرض لعرض الصور بشكل أنيق",
    preview: "/assets/templates/gallery-basic.jpg",
    defaultContent: `# معرض الصور

## العنصر الأول
وصف العنصر الأول في المعرض.

## العنصر الثاني
وصف العنصر الثاني في المعرض.

## العنصر الثالث
وصف العنصر الثالث في المعرض.

## العنصر الرابع
وصف العنصر الرابع في المعرض.`
  },
  {
    id: "cta-basic",
    title: "قسم دعوة للعمل",
    type: SectionType.CallToAction,
    description: "قسم يحتوي على دعوة واضحة لاتخاذ إجراء",
    preview: "/assets/templates/cta-basic.jpg",
    defaultContent: `# ابدأ رحلتك التعليمية اليوم

احصل على استشارة مجانية من خبرائنا وابدأ خطوتك الأولى نحو مستقبل تعليمي أفضل.

[احجز استشارتك المجانية الآن](#booking)`
  },
  {
    id: "map-basic",
    title: "خريطة بسيطة",
    type: SectionType.Map,
    description: "إضافة خريطة تفاعلية لموقعك",
    preview: "/assets/templates/map-basic.jpg",
    defaultContent: `# موقعنا

يمكنك زيارتنا في العنوان التالي:
الرياض، المملكة العربية السعودية`
  },
  {
    id: "custom-html",
    title: "HTML مخصص",
    type: SectionType.CustomHTML,
    description: "إضافة كود HTML مخصص",
    preview: "/assets/templates/custom-html.jpg",
    defaultContent: `<!-- أضف كود HTML المخصص هنا -->
<div class="custom-section">
  <h2>عنوان مخصص</h2>
  <p>محتوى مخصص يمكن تعديله باستخدام HTML مباشرة.</p>
</div>`
  },
];

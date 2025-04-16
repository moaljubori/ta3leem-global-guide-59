
type SectionTitles = Record<string, string>;
type SectionDescriptions = Record<string, string>;

export const getSectionTitle = (sectionId: string | undefined): string => {
  if (!sectionId) return "تحرير الصفحة";
  
  const sectionTitles: SectionTitles = {
    "hero": "قسم الترحيب",
    "processes": "خطوات العمل",
    "countries": "الدول المتاحة",
    "testimonials": "آراء العملاء",
    "blog_previews": "مقالات المدونة",
    "cta": "دعوة للتواصل",
    "about_hero": "مقدمة من نحن",
    "our_mission": "رسالتنا ورؤيتنا",
    "our_team": "فريق العمل",
    "contact_hero": "مقدمة اتصل بنا",
    "contact_info": "معلومات الاتصال",
    "contact_form": "نموذج التواصل",
    "map": "الخريطة",
    "countries_hero": "مقدمة الدول",
    "countries_list": "قائمة الدول"
  };
  
  return sectionTitles[sectionId] || "قسم غير معروف";
};

export const getSectionDescription = (sectionId: string | undefined): string => {
  if (!sectionId) return "تحرير كامل الصفحة";
  
  const sectionDescriptions: SectionDescriptions = {
    "hero": "القسم الرئيسي في أعلى الصفحة مع الصورة والعنوان الرئيسي",
    "processes": "قسم يوضح خطوات عملية التقديم للدراسة في الخارج",
    "countries": "عرض الدول المتاحة للدراسة",
    "testimonials": "شهادات وآراء الطلاب السابقين",
    "blog_previews": "عرض لأحدث المقالات من المدونة",
    "cta": "قسم يحث الزائر على التواصل معنا",
    "about_hero": "النص التعريفي الرئيسي",
    "our_mission": "قسم يوضح رسالة ورؤية الشركة",
    "our_team": "عرض أعضاء فريق العمل",
    "contact_hero": "العنوان الرئيسي والنص التمهيدي",
    "contact_info": "الهاتف والبريد الإلكتروني والعنوان",
    "contact_form": "النموذج الذي يملأه الزوار للتواصل",
    "map": "خريطة الموقع",
    "countries_hero": "العنوان الرئيسي والنص التمهيدي",
    "countries_list": "عرض الدول المتاحة للدراسة"
  };
  
  return sectionDescriptions[sectionId] || "تحرير هذا القسم من الصفحة";
};

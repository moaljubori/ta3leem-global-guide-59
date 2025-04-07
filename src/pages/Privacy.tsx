
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-8 text-blue-800">سياسة الخصوصية</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">مقدمة</h2>
                <p className="mb-3">
                  تلتزم شركة تعليم عالمي ("نحن" أو "الشركة") بحماية خصوصية المستخدمين وبياناتهم الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها عند استخدام موقعنا الإلكتروني.
                </p>
                <p>
                  باستخدامك لموقعنا، فإنك توافق على الممارسات الموضحة في سياسة الخصوصية هذه.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">المعلومات التي نجمعها</h2>
                <p className="mb-3">
                  قد نجمع المعلومات التالية:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>معلومات شخصية مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف عند تعبئة نماذج الاتصال أو طلب الاستشارة.</li>
                  <li>معلومات حول زياراتك لموقعنا الإلكتروني، بما في ذلك معلومات المرور، والصفحات التي تزورها، والوقت المستغرق.</li>
                  <li>المعلومات التي تقدمها عند إنشاء حساب أو التسجيل للحصول على خدماتنا.</li>
                  <li>المعلومات الأكاديمية التي تشاركها معنا للحصول على استشارات تعليمية.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">كيفية استخدام المعلومات</h2>
                <p className="mb-3">
                  نستخدم المعلومات التي نجمعها للأغراض التالية:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>تقديم الاستشارات والخدمات التعليمية التي تطلبها.</li>
                  <li>تخصيص تجربتك وتقديم المحتوى والعروض التي قد تهمك.</li>
                  <li>تحسين موقعنا الإلكتروني وخدماتنا.</li>
                  <li>التواصل معك بخصوص طلباتك واستفساراتك.</li>
                  <li>إرسال معلومات عن خدماتنا والفعاليات ذات الصلة، في حال موافقتك على ذلك.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">حماية المعلومات</h2>
                <p className="mb-3">
                  نحن ملتزمون بضمان أمان معلوماتك الشخصية. لمنع الوصول أو الكشف غير المصرح به، قمنا بتطبيق إجراءات مادية وإلكترونية وإدارية مناسبة لحماية المعلومات التي نجمعها عبر الإنترنت.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">مشاركة المعلومات</h2>
                <p className="mb-3">
                  لن نبيع أو نؤجر أو نتاجر بمعلوماتك الشخصية مع أطراف ثالثة. قد نشارك معلوماتك في الحالات التالية:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>مع المؤسسات التعليمية المعنية بطلبك للدراسة، بعد موافقتك.</li>
                  <li>مع مقدمي الخدمات الذين يساعدوننا في تقديم خدماتنا، مثل معالجة الدفع أو خدمة العملاء.</li>
                  <li>عندما يكون ذلك مطلوبًا بموجب القانون أو للاستجابة لإجراءات قانونية.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">ملفات تعريف الارتباط</h2>
                <p className="mb-3">
                  يستخدم موقعنا ملفات تعريف الارتباط (كوكيز) لتحسين تجربتك وتخصيص المحتوى. يمكنك اختيار رفض ملفات تعريف الارتباط من خلال تعديل إعدادات المتصفح الخاص بك، ولكن قد يؤدي ذلك إلى تقييد بعض وظائف موقعنا.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">حقوقك</h2>
                <p className="mb-3">
                  لديك الحق في:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>الوصول إلى معلوماتك الشخصية التي نحتفظ بها.</li>
                  <li>طلب تصحيح أو تحديث معلوماتك الشخصية.</li>
                  <li>طلب حذف معلوماتك الشخصية.</li>
                  <li>الاعتراض على معالجة معلوماتك الشخصية.</li>
                  <li>طلب تقييد معالجة معلوماتك الشخصية.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">التغييرات على سياسة الخصوصية</h2>
                <p className="mb-3">
                  قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر بنشر نسخة جديدة على موقعنا. عليك مراجعة هذه الصفحة بشكل دوري للتأكد من أنك راضٍ عن أي تغييرات.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">الاتصال بنا</h2>
                <p>
                  إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على البريد الإلكتروني: privacy@ta3leem-global.com
                </p>
              </section>

              <p className="text-sm text-gray-500 mt-8">
                تم التحديث الأخير: 7 أبريل 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

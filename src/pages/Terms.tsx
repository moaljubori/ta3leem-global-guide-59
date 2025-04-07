
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-8 text-blue-800">شروط الاستخدام</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">مقدمة</h2>
                <p className="mb-3">
                  مرحباً بك في موقع تعليم عالمي. تحدد شروط الاستخدام هذه القواعد والأحكام التي تحكم استخدامك لموقعنا الإلكتروني.
                </p>
                <p>
                  باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام موقعنا.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">استخدام الموقع</h2>
                <p className="mb-3">
                  يخضع استخدام هذا الموقع للشروط التالية:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>يجب أن تكون المعلومات التي تقدمها عبر الموقع دقيقة وكاملة وحديثة.</li>
                  <li>لا يجوز استخدام موقعنا بطريقة قد تتسبب في تلف أو تعطيل أو إثقال الموقع أو البنية التحتية المرتبطة به.</li>
                  <li>لا يجوز محاولة الوصول غير المصرح به إلى أي جزء من الموقع، أو الخوادم، أو قواعد البيانات المرتبطة بالموقع.</li>
                  <li>يجب الالتزام بجميع القوانين واللوائح المعمول بها عند استخدام الموقع.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">الخدمات الاستشارية</h2>
                <p className="mb-3">
                  توفر شركة تعليم عالمي خدمات استشارية تعليمية للطلاب الراغبين بالدراسة في الخارج. يرجى ملاحظة ما يلي:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>الاستشارات المقدمة هي للإرشاد والمساعدة فقط، وقد تختلف النتائج النهائية.</li>
                  <li>لا نضمن القبول في أي مؤسسة تعليمية أو الحصول على تأشيرة دراسية.</li>
                  <li>تعتمد نتائج طلبات القبول والتأشيرات على العديد من العوامل خارج سيطرتنا.</li>
                  <li>قد تكون هناك رسوم إضافية مرتبطة بطلبات القبول والتأشيرات غير مشمولة في رسوم خدماتنا.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">حقوق الملكية الفكرية</h2>
                <p className="mb-3">
                  جميع المحتويات المنشورة على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور ومقاطع الفيديو، هي ملك لشركة تعليم عالمي أو مرخصة لها، وهي محمية بموجب قوانين حقوق النشر والعلامات التجارية.
                </p>
                <p>
                  لا يجوز نسخ أو توزيع أو نقل أو عرض أو تعديل أي محتوى من الموقع دون إذن كتابي مسبق.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">إخلاء المسؤولية</h2>
                <p className="mb-3">
                  يتم توفير المحتوى والخدمات على موقعنا "كما هي" و"كما هو متاح". لا نقدم أي ضمانات، صريحة أو ضمنية، فيما يتعلق بدقة أو موثوقية أو اكتمال أي محتوى على الموقع.
                </p>
                <p>
                  لن نتحمل المسؤولية عن أي خسارة أو ضرر قد ينشأ عن استخدام موقعنا أو عدم القدرة على استخدامه.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">تحديث الشروط</h2>
                <p className="mb-3">
                  يحق لنا تحديث شروط الاستخدام هذه في أي وقت دون إشعار مسبق. ستكون التغييرات سارية فور نشرها على الموقع.
                </p>
                <p>
                  استمرار استخدامك للموقع بعد نشر التغييرات يعني موافقتك على الشروط المحدثة.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">القانون المطبق</h2>
                <p>
                  تخضع شروط الاستخدام هذه وتفسر وفقًا للقوانين المعمول بها، وأي نزاع يتعلق بها يخضع للاختصاص القضائي للمحاكم المختصة.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-blue-700">الاتصال بنا</h2>
                <p>
                  إذا كانت لديك أي أسئلة حول شروط الاستخدام هذه، يرجى الاتصال بنا على البريد الإلكتروني: terms@ta3leem-global.com
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

export default Terms;

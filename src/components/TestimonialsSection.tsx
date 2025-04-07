
import { useState } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      university: "جامعة تورنتو",
      country: "كندا",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "ساعدني فريق تعليم عالمي في تحقيق حلمي بالدراسة في كندا. كانت الإجراءات سلسة من البداية للنهاية وحصلت على قبول في جامعة تورنتو بفضل دعمهم المتواصل.",
      rating: 5,
    },
    {
      id: 2,
      name: "سارة عبدالله",
      university: "جامعة هارفارد",
      country: "الولايات المتحدة",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "كنت قلقة بشأن إجراءات القبول المعقدة، لكن المستشارين كانوا محترفين للغاية وساعدوني في كل خطوة. لم أكن لأحصل على منحة هارفارد بدون مساعدتهم.",
      rating: 5,
    },
    {
      id: 3,
      name: "عمر خالد",
      university: "جامعة أكسفورد",
      country: "المملكة المتحدة",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      text: "الخدمات التي قدمها فريق تعليم عالمي تستحق كل قرش. ساعدوني في اختيار التخصص المناسب واجتياز مقابلة القبول، والآن أنا أدرس في واحدة من أفضل جامعات العالم.",
      rating: 4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            قصص نجاح طلابنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استمع إلى تجارب الطلاب الذين ساعدناهم في تحقيق طموحاتهم الأكاديمية حول العالم
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating ? "text-gold-500 fill-gold-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg mb-6">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                <div>
                  <p className="font-bold text-blue-800 text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-500">
                    {testimonials[currentIndex].university} | {testimonials[currentIndex].country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            <button
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronRight className="h-6 w-6 text-blue-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow hover:bg-blue-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CountriesSection = () => {
  const [countries, setCountries] = useState([
    {
      id: "canada",
      name: "كندا",
      flag: "🇨🇦",
      description: "بيئة تعليمية متميزة وفرص وظيفية واعدة بعد التخرج، مع إمكانية الحصول على الإقامة الدائمة.",
      universities: 96,
      studentsHelped: 450,
    },
    {
      id: "usa",
      name: "الولايات المتحدة",
      flag: "🇺🇸",
      description: "جامعات مرموقة عالمياً وبرامج متنوعة في جميع التخصصات، مع بيئة بحثية متطورة.",
      universities: 127,
      studentsHelped: 380,
    },
    {
      id: "uk",
      name: "المملكة المتحدة",
      flag: "🇬🇧",
      description: "برامج دراسية قصيرة المدة وتاريخ عريق في التعليم العالي، مع شهادات معترف بها دولياً.",
      universities: 84,
      studentsHelped: 310,
    },
  ]);

  // Load countries from localStorage if available (admin edited content)
  useEffect(() => {
    const storedCountries = localStorage.getItem("adminCountriesData");
    if (storedCountries) {
      try {
        const parsedData = JSON.parse(storedCountries);
        // Map to ensure we have the right fields
        const validatedData = parsedData.map(country => ({
          ...country,
          universities: country.universities || 50,
          studentsHelped: country.studentsHelped || 200,
          flag: country.flag || "🌍" // Default flag if not available
        }));
        setCountries(validatedData);
      } catch (error) {
        console.error("Error parsing countries data:", error);
      }
    }
  }, []);

  return (
    <section className="py-20 bg-gray-50" id="countries">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            اختر وجهتك الدراسية المثالية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم خدماتنا الاستشارية للدراسة في أفضل الجامعات العالمية في ثلاث دول رائدة في مجال التعليم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {countries.map((country) => (
            <div 
              key={country.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{country.name}</h3>
                  <span className="text-4xl">{country.flag}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6 h-24">{country.description}</p>
                <div className="flex justify-between mb-8 text-sm text-gray-500">
                  <div>
                    <p className="font-bold text-blue-800 text-xl">{country.universities}+</p>
                    <p>جامعة</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-800 text-xl">{country.studentsHelped}+</p>
                    <p>طالب</p>
                  </div>
                </div>
                <Link to={`/countries/${country.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    استكشف الفرص
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;

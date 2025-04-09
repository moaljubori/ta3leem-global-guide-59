
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, ImageIcon, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Default countries data
const defaultCountriesData = [
  { 
    id: "canada", 
    name: "كندا", 
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1501435764075-903868ebb179?ixlib=rb-4.0.3", 
    description: "أفضل الجامعات في كندا",
    universities: 96,
    studentsHelped: 450,
    benefits: [
      "جودة تعليمية عالمية",
      "تكاليف دراسة معقولة",
      "إمكانية العمل أثناء الدراسة",
      "فرص واسعة للإقامة بعد التخرج",
      "بيئة متعددة الثقافات وآمنة"
    ],
  },
  { 
    id: "uk", 
    name: "المملكة المتحدة", 
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3", 
    description: "الدراسة في بريطانيا",
    universities: 84,
    studentsHelped: 310,
    benefits: [
      "برامج دراسية قصيرة المدة",
      "شهادات معترف بها دولياً",
      "تاريخ عريق في التعليم العالي",
      "موقع استراتيجي للسفر في أوروبا",
      "فرص عمل لما بعد الدراسة"
    ],
  },
  { 
    id: "usa", 
    name: "الولايات المتحدة", 
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?ixlib=rb-4.0.3", 
    description: "فرص تعليمية في الولايات المتحدة",
    universities: 127,
    studentsHelped: 380,
    benefits: [
      "جامعات مرموقة عالمياً",
      "تنوع كبير في البرامج والتخصصات",
      "فرص بحثية وتدريبية متميزة",
      "شبكة خريجين واسعة ومؤثرة",
      "بيئة مشجعة للإبداع والابتكار"
    ],
  },
];

const CountriesSection = () => {
  const { toast } = useToast();
  const [countries, setCountries] = useState(defaultCountriesData);
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const [editingBenefits, setEditingBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState<string>("");

  // Load data from local storage on component mount
  useEffect(() => {
    const storedCountries = localStorage.getItem("adminCountriesData");
    if (storedCountries) {
      try {
        const parsedCountries = JSON.parse(storedCountries);
        setCountries(parsedCountries);
      } catch (error) {
        console.error("Error parsing countries data:", error);
      }
    } else {
      // If no stored countries, initialize localStorage with default
      localStorage.setItem("adminCountriesData", JSON.stringify(defaultCountriesData));
    }
  }, []);

  const handleEditCountry = (country: any) => {
    setEditingBenefits(country.benefits || []);
    setEditingCountry(country);
  };

  const saveCountry = (country: any) => {
    let updatedCountries;
    
    if (country.id) {
      // Update existing country
      updatedCountries = countries.map(c => c.id === country.id ? country : c);
    } else {
      // Add new country with generated ID
      const newId = country.name.toLowerCase().replace(/\s+/g, '-');
      updatedCountries = [...countries, { ...country, id: newId }];
    }
    
    setCountries(updatedCountries);
    
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminCountriesData", JSON.stringify(updatedCountries));
    
    setEditingCountry(null);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الدولة بنجاح",
    });
  };

  const deleteCountry = (id: number | string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدولة؟")) {
      const updatedCountries = countries.filter(c => c.id !== id);
      setCountries(updatedCountries);
      
      // Update localStorage
      localStorage.setItem("adminCountriesData", JSON.stringify(updatedCountries));
      
      toast({
        title: "تم الحذف",
        description: "تم حذف الدولة بنجاح",
      });
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setEditingBenefits([...editingBenefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setEditingBenefits(editingBenefits.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">إدارة الدول</h2>
        <Button onClick={() => {
          setEditingBenefits([]);
          setEditingCountry({ name: "", description: "", image: "", benefits: [], flag: "🌍" });
        }}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة دولة جديدة
        </Button>
      </div>
      
      {editingCountry ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingCountry.id ? "تعديل دولة" : "إضافة دولة جديدة"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="country-name" className="text-sm font-medium">اسم الدولة</label>
                <Input 
                  id="country-name" 
                  value={editingCountry.name} 
                  onChange={(e) => setEditingCountry({...editingCountry, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country-flag" className="text-sm font-medium">علم الدولة (إيموجي)</label>
                <Input 
                  id="country-flag" 
                  value={editingCountry.flag} 
                  onChange={(e) => setEditingCountry({...editingCountry, flag: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="country-universities" className="text-sm font-medium">عدد الجامعات</label>
                <Input 
                  id="country-universities" 
                  type="number"
                  value={editingCountry.universities || 0} 
                  onChange={(e) => setEditingCountry({...editingCountry, universities: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country-students" className="text-sm font-medium">عدد الطلاب المساعدين</label>
                <Input 
                  id="country-students" 
                  type="number"
                  value={editingCountry.studentsHelped || 0} 
                  onChange={(e) => setEditingCountry({...editingCountry, studentsHelped: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="country-description" className="text-sm font-medium">الوصف</label>
              <Textarea 
                id="country-description" 
                value={editingCountry.description} 
                onChange={(e) => setEditingCountry({...editingCountry, description: e.target.value})}
                rows={4}
              />
            </div>
            
            {/* Benefits Management */}
            <div className="space-y-2">
              <label className="text-sm font-medium">المميزات</label>
              <div className="space-y-2">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="أضف ميزة جديدة"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addBenefit}>
                    إضافة
                  </Button>
                </div>
                <ul className="border rounded-md p-2 min-h-[100px]">
                  {editingBenefits.map((benefit, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span>{benefit}</span>
                      <Button size="sm" variant="ghost" onClick={() => removeBenefit(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                  {editingBenefits.length === 0 && (
                    <li className="py-2 text-gray-400 text-center">لا توجد مميزات مضافة</li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="country-image" className="text-sm font-medium">صورة الدولة</label>
              <div className="border rounded-md p-4 space-y-4">
                {editingCountry.image ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video mx-auto overflow-hidden rounded-md border">
                      <img 
                        src={editingCountry.image} 
                        alt="Preview" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingCountry({...editingCountry, image: ""})}
                      className="w-full text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      حذف الصورة
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50">
                    <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-1">أدخل رابط الصورة</p>
                    <Input 
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      className="mt-2"
                      onChange={(e) => setEditingCountry({...editingCountry, image: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditingCountry(null)}>إلغاء</Button>
            <Button onClick={() => saveCountry({...editingCountry, benefits: editingBenefits})}>حفظ</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الصورة</TableHead>
                  <TableHead>اسم الدولة</TableHead>
                  <TableHead>العلم</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>المميزات</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countries.map((country) => (
                  <TableRow key={country.id}>
                    <TableCell>
                      <div className="w-16 h-10 rounded overflow-hidden">
                        {country.image ? (
                          <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{country.name}</TableCell>
                    <TableCell>{country.flag}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{country.description}</TableCell>
                    <TableCell>{country.benefits?.length || 0} ميزات</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditCountry(country)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteCountry(country.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CountriesSection;

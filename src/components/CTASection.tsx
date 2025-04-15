
import ContactOptions from "./ContactOptions";

const CTASection = () => {
  return (
    <section id="consultation-form" className="py-20 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ContactOptions 
            whatsappNumber="+12345678901"
            phoneNumber="+12345678901"
            emailAddress="info@ta3leem-global.com"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

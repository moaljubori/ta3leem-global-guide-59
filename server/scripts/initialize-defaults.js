
require('dotenv').config({ path: '../../.env' });
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

async function initializeDefaults() {
  console.log('Initializing Default Settings');
  console.log('-----------------------------');
  
  let db;
  
  try {
    // Get database configuration from environment variables
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'dbuser',
      password: process.env.DB_PASSWORD || 'dbpassword',
      database: process.env.DB_DATABASE || 'mydatabase',
      port: parseInt(process.env.DB_PORT || '3306', 10)
    };
    
    // Connect to database
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully.');
    
    // Initialize default settings
    const defaultSettings = [
      {
        name: 'site_name',
        value: 'My Website',
        type: 'string',
        category: 'general',
        description: 'Name of the website',
        is_published: true
      },
      {
        name: 'site_description',
        value: 'My website description',
        type: 'string',
        category: 'general',
        description: 'Short description of the website',
        is_published: true
      },
      {
        name: 'contact_email',
        value: 'contact@example.com',
        type: 'string',
        category: 'contact',
        description: 'Main contact email',
        is_published: true
      },
      {
        name: 'contact_phone',
        value: '+1234567890',
        type: 'string',
        category: 'contact',
        description: 'Main contact phone number',
        is_published: true
      },
      {
        name: 'social_facebook',
        value: 'https://facebook.com/',
        type: 'string',
        category: 'social',
        description: 'Facebook page URL',
        is_published: true
      },
      {
        name: 'social_twitter',
        value: 'https://twitter.com/',
        type: 'string',
        category: 'social',
        description: 'Twitter profile URL',
        is_published: true
      },
      {
        name: 'social_instagram',
        value: 'https://instagram.com/',
        type: 'string',
        category: 'social',
        description: 'Instagram profile URL',
        is_published: true
      },
      {
        name: 'social_linkedin',
        value: 'https://linkedin.com/',
        type: 'string',
        category: 'social',
        description: 'LinkedIn profile URL',
        is_published: true
      },
      {
        name: 'google_analytics_id',
        value: '',
        type: 'string',
        category: 'analytics',
        description: 'Google Analytics ID (e.g., UA-XXXXX-Y or G-XXXXXXXX)',
        is_published: true
      },
      {
        name: 'footer_text',
        value: '© 2023 My Website. All rights reserved.',
        type: 'string',
        category: 'general',
        description: 'Text to display in the website footer',
        is_published: true
      }
    ];
    
    // Insert settings if they don't exist
    for (const setting of defaultSettings) {
      const [existingSettings] = await db.query(
        'SELECT setting_id FROM settings WHERE name = ?',
        [setting.name]
      );
      
      if (existingSettings.length === 0) {
        const settingId = uuidv4();
        
        await db.query(
          `INSERT INTO settings 
           (setting_id, name, value, type, category, description, is_published)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [settingId, setting.name, setting.value, setting.type, 
           setting.category, setting.description, setting.is_published]
        );
        
        console.log(`Setting created: ${setting.name}`);
      } else {
        console.log(`Setting already exists: ${setting.name}`);
      }
    }
    
    // Initialize default countries
    const defaultCountries = [
      {
        name: 'Canada',
        code: 'CA',
        url_slug: 'canada',
        content: '<p>Information about immigration to Canada.</p>',
        meta_title: 'Canada Immigration',
        meta_description: 'Information about immigrating to Canada',
        is_published: true
      },
      {
        name: 'United States',
        code: 'US',
        url_slug: 'united-states',
        content: '<p>Information about immigration to the United States.</p>',
        meta_title: 'US Immigration',
        meta_description: 'Information about immigrating to the United States',
        is_published: true
      },
      {
        name: 'United Kingdom',
        code: 'GB',
        url_slug: 'united-kingdom',
        content: '<p>Information about immigration to the United Kingdom.</p>',
        meta_title: 'UK Immigration',
        meta_description: 'Information about immigrating to the United Kingdom',
        is_published: true
      },
      {
        name: 'Australia',
        code: 'AU',
        url_slug: 'australia',
        content: '<p>Information about immigration to Australia.</p>',
        meta_title: 'Australia Immigration',
        meta_description: 'Information about immigrating to Australia',
        is_published: true
      },
      {
        name: 'New Zealand',
        code: 'NZ',
        url_slug: 'new-zealand',
        content: '<p>Information about immigration to New Zealand.</p>',
        meta_title: 'New Zealand Immigration',
        meta_description: 'Information about immigrating to New Zealand',
        is_published: true
      },
      {
        name: 'Europe',
        code: 'EU',
        url_slug: 'europe',
        content: '<p>Information about immigration to European countries.</p>',
        meta_title: 'Europe Immigration',
        meta_description: 'Information about immigrating to European countries',
        is_published: true
      }
    ];
    
    // Insert countries if they don't exist
    for (const country of defaultCountries) {
      const [existingCountries] = await db.query(
        'SELECT country_id FROM countries WHERE url_slug = ?',
        [country.url_slug]
      );
      
      if (existingCountries.length === 0) {
        const countryId = uuidv4();
        
        await db.query(
          `INSERT INTO countries 
           (country_id, name, code, content, url_slug, meta_title, meta_description, is_published)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [countryId, country.name, country.code, country.content, 
           country.url_slug, country.meta_title, country.meta_description, country.is_published]
        );
        
        console.log(`Country created: ${country.name}`);
      } else {
        console.log(`Country already exists: ${country.name}`);
      }
    }
    
    // Initialize default services
    const defaultServices = [
      {
        name: 'Immigration Consultation',
        url_slug: 'immigration-consultation',
        short_description: 'Expert guidance on immigration options.',
        content: '<p>Our immigration consultation service provides expert guidance on all immigration pathways.</p>',
        is_published: true
      },
      {
        name: 'Visa Application',
        url_slug: 'visa-application',
        short_description: 'Professional assistance with visa applications.',
        content: '<p>Let our experts help you with the visa application process to increase chances of approval.</p>',
        is_published: true
      },
      {
        name: 'Settlement Services',
        url_slug: 'settlement-services',
        short_description: 'Support for settling in your new country.',
        content: '<p>We provide comprehensive support to help you settle successfully in your new country.</p>',
        is_published: true
      }
    ];
    
    // Insert services if they don't exist
    for (const service of defaultServices) {
      const [existingServices] = await db.query(
        'SELECT service_id FROM services WHERE url_slug = ?',
        [service.url_slug]
      );
      
      if (existingServices.length === 0) {
        const serviceId = uuidv4();
        
        await db.query(
          `INSERT INTO services 
           (service_id, name, url_slug, short_description, content, is_published)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [serviceId, service.name, service.url_slug, service.short_description, 
           service.content, service.is_published]
        );
        
        console.log(`Service created: ${service.name}`);
      } else {
        console.log(`Service already exists: ${service.name}`);
      }
    }
    
    console.log('\nDefault settings, countries, and services initialized successfully!');
    
  } catch (error) {
    console.error('Error initializing defaults:', error.message);
  } finally {
    if (db) await db.end();
  }
}

initializeDefaults();

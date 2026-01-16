import React, { useEffect, useState } from 'react';
import { getItemsGeneric } from '@wade-usa/sdk';
import { WADE_CONFIG } from '../config'; 
import { WadeButton } from '@wade-usa/ui';
import * as LucideIcons from 'lucide-react';
import styles from './Home.module.css';

// Keep the interface for local type safety
interface ServiceItem {
  id: string | number;
  title: string;
  description: string;
  icon_name: string;
}

const Home = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
      async function loadData() {
        const data = await getItemsGeneric(WADE_CONFIG.collections.services, {
          filter: { status: { _eq: 'published' } }
        });
        
        setServices(data as ServiceItem[]); 
      }
      loadData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Our Core Services</h1>
        <p>Dynamic solutions powered by Wade-USA</p>
      </header>

      <div className={styles.grid}>
        {services.map((service) => {
          // Dynamic Icon Lookup from Lucide
          const IconComponent = (LucideIcons as any)[service.icon_name];

          return (
            <section key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {IconComponent ? (
                  <IconComponent size={32} strokeWidth={1.5} />
                ) : (
                  <LucideIcons.Activity size={32} />
                )}
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
              <WadeButton label="Get Started" />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
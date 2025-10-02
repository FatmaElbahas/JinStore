import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-primary-50 border-t border-gray-200 mt-auto opacity-100" style={{ minHeight: '45px' }}>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-sm text-gray-600 h-full gap-3 md:gap-0 py-3 md:py-0" style={{ paddingRight: '16px', paddingLeft: '16px' }}>
        <p 
          className="text-center md:text-start align-middle"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '18px',
            letterSpacing: '0%'
          }}
        >
          {t('footer.copyright', { year: currentYear })} <a href="#" className="hover:underline" style={{ color: '#634C9F' }}>{t('footer.themesLink')}</a>
        </p>
        
        <nav 
          className="flex items-center gap-3 md:gap-6 align-middle flex-wrap justify-center" 
          aria-label="Footer navigation"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '18px',
            letterSpacing: '0%'
          }}
        >
          <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t('footer.licenses')}</a>
          <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t('footer.changelog')}</a>
          <a href="#" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t('footer.help')}</a>
        </nav>
      </div>
    </footer>
  );
}

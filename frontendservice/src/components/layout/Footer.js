import { default as React } from 'react';
import StyledButton from '../ui/StyledButton';

const Footer = () => (
    <footer style={styles.footer}>
        <p style={styles.text}>© 2025 Service Market - Kamil Danelczyk</p>
        <StyledButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={styles.button}>
            Back to Top
        </StyledButton>
    </footer>
);

const styles = {
    footer: {
        backgroundColor: '#1a1a1a',
        color: '#b3b3b3',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        position: 'fixed',
        bottom: '0',
        width: '100%',
        boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    text: {
        margin: '0',
        fontSize: '14px',
        fontWeight: '400',
    },
    button: {
        marginLeft: 'auto',
    }
};

export default Footer;

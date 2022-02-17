import PropTypes from 'prop-types';
import s from 'components/Section/Section.module.css';


function Section({ title, children }) {
  return (
    <section>
      <h2 className={s.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;

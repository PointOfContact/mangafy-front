import styles from './styles.module.scss';
import cn from 'classnames';

const Option = ({ inQuery, option, applyFilter }) => {
  const clickHandler = () => {
    applyFilter({ inQuery, value: option.value, title: option.title });
  };
  const classes = [styles.option];

  if (option.isDisabled) {
    classes.push(styles.option_disabled);
  } else if (option.isSelected) {
    classes.push(styles.option_enabled);
  }
  return (
    <div className={cn(classes)} onClick={option.isDisabled ? null : clickHandler}>
      {option.title}
    </div>
  );
};

export default Option;

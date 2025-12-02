import useTableStyle from './useTableStyle';
const ProtableCustomRender = (props: { dom: JSX.Element }) => {
  const { dom } = props;
  const { styles } = useTableStyle();
  return <div className={styles.wrapper}>{dom}</div>;
};
export default ProtableCustomRender;

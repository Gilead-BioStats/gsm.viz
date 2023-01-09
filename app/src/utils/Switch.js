const Switch = ({ test, children }) => {
  const defaultResult = children.find((child) => child.props.default) || null;
  const result = children.find((child) => child.props.value === test);

  return result || defaultResult;
};

const Case = ({ children }) => children;

export { Switch, Case }
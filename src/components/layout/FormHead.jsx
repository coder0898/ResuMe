const FormHead = ({ Icon, title }) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-6 border-b pb-3">
        <Icon className="h-8 w-8" />
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      </div>
    </>
  );
};

export default FormHead;

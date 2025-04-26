const LayoutContainer = ({ left, right }) => (
    <div className="flex w-full h-[94%]">
      <div className="w-[40%] h-full border-r border-gray-700 flex flex-col">
        {left}
      </div>
      <div className="w-[60%] h-full flex flex-col">
        {right}
      </div>
    </div>
  );
  
  export default LayoutContainer;
  
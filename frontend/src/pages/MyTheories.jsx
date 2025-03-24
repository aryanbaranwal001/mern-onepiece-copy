import MyTheoryRight from "../components/MyThoeryRight";

const MyTheories = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-screen gap-2">
        {/* Your Theories  */}
        <div className="h-full w-full bg-slate-50">a</div>

        {/* Create New Theory  */}
        <MyTheoryRight />
      </div>
    </>
  );
};

export default MyTheories;




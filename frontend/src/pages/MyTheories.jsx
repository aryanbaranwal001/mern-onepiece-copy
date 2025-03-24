import MyTheoryRight from "../components/MyTheoryRight";
import MyTheoryLeft from "../components/MyTheoryLeft";

const MyTheories = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 items-center">

        <div className="flex items-center justify-center">
          <MyTheoryLeft />
        </div>

        <MyTheoryRight />
      </div>
    </>
  );
};

export default MyTheories;




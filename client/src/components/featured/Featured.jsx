import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotel/countByCity?cities=Chiang Mai,Phuket,Bangkok"
  );

  const image = [
    "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
  ];

  const featuredLists = data.map((count, idx) => {
    return {
      image: image[idx] || "",
      title: count.city || "",
      count: count.count || "",
    };
  });

  return (
    <div className="featured">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {featuredLists.map((data) => (
            <div className="featuredItem" key={data.title}>
              <img src={data.image} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>{data.title}</h1>
                <h2>{data.count} properties</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Featured;

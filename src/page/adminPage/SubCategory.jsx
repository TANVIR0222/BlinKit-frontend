import UploadeSubCategoryModel from "./UploadeSubCategoryModel";
import { useGetAllSubCategoryQuery } from "@/app/feature/subCategory/subCategoryApi";
import SubCategoryDeleteProduct from "@/components/common/SubCategoryDeleteProduct";
import SubCategoryEdite from "@/components/common/SubCategoryEdite";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Helmet } from "react-helmet";

const SubCategory = () => {
  const { data, isLoading } = useGetAllSubCategoryQuery();

  return (
    <div>
      <section className="">
      <Helmet>
        <title>Admin SubCategory Page || Blinkeyit</title>
      </Helmet>
        <div className="p-2   bg-white shadow-md flex items-center justify-between">
          <h2 className="font-semibold">Sub Category</h2>
          <button className="">
            <UploadeSubCategoryModel />
          </button>
        </div>


        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>Image</TableHead>
              {/* <TableHead  >ViewImage</TableHead> */}
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Edite</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading && <div className="text-rose-500">Loading...</div>}
          <TableBody>
            {data?.categorys.map((item, index) => (
              <TableRow className="gap-4 h-24 " key={item._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="md:font-medium text-sm">
                  {item.name}
                </TableCell>
                <TableCell className="">
                  <img
                    className="h-10 w-10 md:h-16 md:w-16"
                    src={item.image}
                    alt=""
                  />
                </TableCell>
                <TableCell className="md:font-medium text-sm">
                  {item.category}
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <SubCategoryEdite category={item} />{" "}
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <SubCategoryDeleteProduct id={item._id} />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default SubCategory;

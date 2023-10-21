import { medicareApi } from "@/utils/http";
import { Dialog, Transition } from "@headlessui/react";
// import { gqa } from '@utils/http';
// import { ButtonSpinnerSvg } from '@utils/icons';
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

function DeleteProductModal(props) {
  const [processing, setProcessing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalName] = useState("deleteProductModal");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (props.modalName === modalName) {
      setOpenModal(props.modalStatus);
    }
  }, [setOpenModal, props.modalStatus]);

  function modalClose() {
    setOpenModal(false);
    setTimeout(() => {
      props.modalClose({
        modalName: modalName,
      });
    }, 1000);
  }

  function deleteData() {
    setProcessing(true);
    if (answer === "" || answer !== "delete") {
      setProcessing(false);
      toast.error("To confirm deletion, type delete.", { duration: 3000 });
      return;
    }

    setProcessing(true);
    medicareApi
      .delete(`/product/${props?.product?.id}`)
      .then((response) => {
        toast.success("Product is deleted", { duration: 3000 });
        props.refetchDataEmit();
        modalClose();
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.data?.errors[0]?.message, {
            duration: 3000,
          });
        } else {
          toast.error(error?.response?.data?.message, {
            duration: 3000,
          });
        }
      });
  }

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        //initialFocus={cancelButtonRef}
        onClose={() => modalClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Delete Product - {props?.product?.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <label
                            htmlFor="title"
                            className=" mb-2 text-left block text-sm font-medium text-gray-700"
                          >
                            To confirm deletion, type{" "}
                            <span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5   bg-green-100 text-green-800">
                              delete
                            </span>{" "}
                            in the field:{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            className={
                              "block w-full pr-10  sm:text-sm rounded-md focus:ring-primary placeholder-primary focus:outline-none"
                            }
                            placeholder="delete"
                            onChange={(e) => setAnswer(e.target.value)}
                            aria-invalid="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                    disabled={processing}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteData();
                    }}
                  >
                    {processing ? (
                      <div className="flex items-center">
                        {/* <ButtonSpinnerSvg/> */}
                        Deleting...
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => modalClose()}
                    //ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default DeleteProductModal;

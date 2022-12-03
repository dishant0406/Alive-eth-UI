/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";


export default function DownloadModal({handlePlay=()=>{}, open, setOpen, songName, setSongName}) {


  const cancelButtonRef = useRef(null);

  const dismiss = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={dismiss}
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
          <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-10 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-5 sm:max-w-lg sm:w-full sm:h-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-5 mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <BellIcon
                      className="h-8 w-8 text-red"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl leading-6 font-medium text-gray"
                    >
                      Download Your Remix
                    </Dialog.Title>
                    <div className="mt-2">
                      <input value={songName} onChange={(e)=>setSongName(e.target.value)} placeholder="Give a name" className="w-[20rem] bg-white border border-gray py-[0.5rem] mt-[1rem] px-[1rem] text-gray font-[600]"/>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button onClick={handlePlay} className="bg-yellow border border-gray py-[0.5rem] px-[1rem]">Download</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
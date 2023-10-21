import { usePopper } from "@/hooks/use-popper";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TheMenu(props) {
  let [trigger, container] = usePopper({
    placement: props?.placement ?? "right",
    strategy: props?.strategy ?? "absolute",
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
  });

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            ref={trigger}
            onClick={(e) => e.stopPropagation()}
            className=" flex rounded-full bg-white text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-7 h-5 pr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          ref={container}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {props.children}
        </Transition>
      </Menu>
    </div>
  );
}

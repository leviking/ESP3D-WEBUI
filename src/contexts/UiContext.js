/*
 UiContext.js - ESP3D WebUI context file

 Copyright (c) 2021 Alexandre Aussourd. All rights reserved.
 Modified by Luc LEBOSSE 2021
 
 This code is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.
 This code is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.
 You should have received a copy of the GNU Lesser General Public
 License along with This code; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
import { h, createContext } from "preact";
import { useContext, useState, useRef } from "preact/hooks";
import { generateUID, removeEntriesByIDs } from "../components/Helpers";

/*
 * Local const
 *
 */
const UiContext = createContext("uiContext");
const useUiContext = () => useContext(UiContext);
const UiContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const [modals, setModal] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [connectionState, setConnectionState] = useState({
    connected: false,
    page: "connecting",
  });
  const toastsRef = useRef(toasts);
  toastsRef.current = toasts;

  const addToast = (newToast) => {
    setToasts([...toasts, { ...newToast, id: generateUID() }]);
  };

  const removeToast = (uids) => {
    const removedIds = removeEntriesByIDs(toastsRef.current, uids);
    setToasts([...removedIds]);
  };

  const addModal = (newModal) => setModal([...modals, newModal]);
  const removeModal = (modalIndex) => {
    const newModalList = modals.filter((modal, index) => index !== modalIndex);
    setModal(newModalList);
  };

  const store = {
    data: [data, setData],
    modals: { modalList: modals, addModal, removeModal },
    toasts: { toastList: toasts, addToast, removeToast },
    connection: { connectionState, setConnectionState },
  };

  return <UiContext.Provider value={store}>{children}</UiContext.Provider>;
};

export { UiContextProvider, useUiContext };

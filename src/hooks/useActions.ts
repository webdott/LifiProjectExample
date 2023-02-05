import { useAppDispatch } from "./../redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./../redux";

export function useActions() {
  const dispatch = useAppDispatch();

  return bindActionCreators(actionCreators, dispatch);
}

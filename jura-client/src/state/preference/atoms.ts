import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface PreferenceState {
  lastVisitedProjectId?: string;
}

const preferenceAtom = atomWithStorage<PreferenceState>("counter", {});

const setLastVisitedProjectIdAtom = atom(null, (get, set, projectId?: string) => {
  const preference = get(preferenceAtom);
  set(preferenceAtom, { ...preference, lastVisitedProjectId: projectId });
});

export const usePreferenceState = () => {
  const setLastVisitedProjectId = useSetAtom(setLastVisitedProjectIdAtom);
  const preference = useAtomValue(preferenceAtom);

  return { setLastVisitedProjectId, ...preference };
};

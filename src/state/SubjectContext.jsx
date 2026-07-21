import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { SUBJECTS } from "../data/mockData";
import { readStorage, writeStorage } from "../utils/storage";

const STORAGE_KEY = "achieva:selectedSubject";
const SubjectContext = createContext(null);

function isValidSubject(id) {
  return SUBJECTS.some((subject) => subject.id === id);
}

export function SubjectProvider({ children }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    const saved = readStorage(STORAGE_KEY, SUBJECTS[0].id);
    return isValidSubject(saved) ? saved : SUBJECTS[0].id;
  });

  const updateSelectedSubjectId = useCallback((subjectId) => {
    if (!isValidSubject(subjectId)) return;
    setSelectedSubjectId(subjectId);
    writeStorage(STORAGE_KEY, subjectId);
  }, []);

  const selectedSubject = useMemo(
    () => SUBJECTS.find((subject) => subject.id === selectedSubjectId) || SUBJECTS[0],
    [selectedSubjectId]
  );

  const value = useMemo(() => ({
    subjects: SUBJECTS,
    selectedSubject,
    selectedSubjectId,
    setSelectedSubjectId: updateSelectedSubjectId,
  }), [selectedSubject, selectedSubjectId, updateSelectedSubjectId]);

  return <SubjectContext.Provider value={value}>{children}</SubjectContext.Provider>;
}

export function useSubject() {
  const context = useContext(SubjectContext);
  if (!context) throw new Error("useSubject must be used inside <SubjectProvider>");
  return context;
}

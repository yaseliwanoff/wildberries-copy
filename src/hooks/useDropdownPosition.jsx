const useDropdownPosition = (triggerRef, isOpen) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const recalculate = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      left: rect.left,
    });
  }, [triggerRef]);

  useEffect(() => {
    if (isOpen) {
      recalculate();
      window.addEventListener("scroll", recalculate, true);
      window.addEventListener("resize", recalculate);
      return () => {
        window.removeEventListener("scroll", recalculate, true);
        window.removeEventListener("resize", recalculate);
      };
    }
  }, [isOpen, recalculate]);

  return pos;
};

export default useDropdownPosition;

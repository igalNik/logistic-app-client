export function mergeClasses(...args: (string | undefined | null)[]): string {
  const classes = args
    .filter(
      (arg): arg is string => typeof arg === 'string' && arg.trim() !== ''
    ) // Keep only non-empty strings
    .flatMap((arg) => arg.trim().split(/\s+/)); // Split by whitespace, flatten array  return mergedClasses;
  // Remove duplicates using Set
  const uniqueClasses = [...new Set(classes)];

  // Join into a single string
  return uniqueClasses.join(' ');
}

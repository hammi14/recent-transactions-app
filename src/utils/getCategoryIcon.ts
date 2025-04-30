export default function getCategoryIcon(category: string): string {
    switch (category) {
      case "Food":
        return "food";
      case "Transport":
        return "bus";
      case "Entertainment":
        return "movie";
      case "Shopping":
        return "shopping";
      default:
        return "cash";
    }
  }
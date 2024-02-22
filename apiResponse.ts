interface ApiResponse {
    exchange_rates: {
      edges: {
        node: {
          id: string;
          pair_at: string;
          pair_left: string;
          pair_right: string;
          pair_numeric: number;
        }[];
      };
    };
  }
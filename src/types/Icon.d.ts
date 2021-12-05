interface Props {
  /**
   * Component's HTML Element
   *
   * @default 'i'
   */
  component?: string;

  /** Icon badge */
  badge?: string | number | React.ReactNode;

  /**
   * Badge colors. Object with Tailwind CSS colors classes
   * */
  badgeColors?: {
    /**
     * Badge bg color
     *
     * @default 'bg-primary'
     */
    bg?: string;
    /**
     * Badge text color
     *
     * @default 'text-white'
     */
    text?: string;
  };
}
